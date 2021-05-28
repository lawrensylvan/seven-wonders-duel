import { _ } from 'lodash'

import { nextAge } from '../eventHandlers/nextAge'
import { applyBuildingEffects} from '../eventHandlers/applyBuildingEffects'
import { flipPyramidBuildings } from '../eventHandlers/flipPyramidBuildings'
import { swapTurns } from '../eventHandlers/swapTurns'
import allBuildings from '../cardsInfos/buildings.json'

export function * buyBuilding (state, player, {building}) {

    // check if it's player turn
    if(state.toPlay !== state.players.indexOf(player)) throw 'It is not your turn'
    
    // check that the building is indeed in the pyramid
    const targetStage = state.pyramid.filter(stage => stage.some(b => b?.name === building))?.[0]
    if(!targetStage) throw `The building ${building} is not in the pyramid`
    
    // check whether the next pyramid stage down has more or fewer slots
    const buildingIndex = targetStage.map(b => b?.name).indexOf(building)
    const bottomStage = state.pyramid[state.pyramid.indexOf(targetStage) + 1]
    if(bottomStage) {
        const offset = bottomStage.length - targetStage.length
        // check if there are cards on the next stage that would block from taking this card
        const bottomCardIndexes = [buildingIndex, buildingIndex + offset]
        const bottomCards = bottomCardIndexes.map(i => bottomStage[i]).filter(b => b)
        if(bottomCards.length) throw `The building ${building} is not accessible from the pyramid`
    }

    const buildingInfo = allBuildings.filter(b => b.name === building)[0]
    const playerId = state.players.indexOf(player)
    
    let price = buildingInfo.price ?? 0
    // check resource requirements
    if(buildingInfo.requirements) {
        let requirements = buildingInfo.requirements
        let production = state.cities[playerId].buildings.flatMap(b => allBuildings.filter(c => c.name === b.name)[0].production) // TODO : also count wonder's production
        for(const requirement of requirements) {
            if(production.includes(requirement)) {
                _.remove(production, p => p === requirement)    // TODO : handle double productions such as clay OR wood
            } else {
                const opponentResourceCount = state.cities[playerId ? 0 : 1].buildings
                    .map(b => allBuildings.filter(c => c.name === b.name)[0])
                    .flatMap(b => b.production)
                    .filter(p => p === requirement)
                    .length
                const resourcePrice = 2 + opponentResourceCount
                price += resourcePrice
            }
        }
    }

    // check price and pay
    if(price > state.cities[playerId].coins) {
        throw `You don't have enough coin to buy the ${building}`
    }
    state.cities[playerId].coins -= price


    // move building from pyramid to player
    state.pyramid[state.pyramid.indexOf(targetStage)][buildingIndex] = null
    state.cities[playerId].buildings.push({name: building})

    yield applyBuildingEffects(player, building)

    yield flipPyramidBuildings(targetStage, buildingIndex)

    yield swapTurns()
    
    if(!state.pyramid.some(stage => stage.some(b => b))) {
        yield nextAge()
    }

}