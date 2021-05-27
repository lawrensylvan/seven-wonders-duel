import { _ } from 'lodash'

import { nextAge } from '../eventHandlers/nextAge'
import { applyBuildingEffects} from '../eventHandlers/applyBuildingEffects'
import { flipPyramidBuildings } from '../eventHandlers/flipPyramidBuildings'

export const buyBuilding = (state, player, {building}) => {

    // check if it's player turn
    if(state.toPlay !== player) throw 'It is not your turn'
    
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

    // TODO : check resource requirements

    // TODO : check price and pay

    // move building from pyramid to player
    state.pyramid[state.pyramid.indexOf(targetStage)][buildingIndex] = null
    const id = state.players.indexOf(player)
    state.cities[id].buildings.push({name: building})


    // apply building's immediate and permanent effects, then unhide the pyramid cards that were revealed
    let nextEvents = [
        applyBuildingEffects(player, building),
        flipPyramidBuildings(targetStage, buildingIndex)
        // TODO : next turn
    ]
    if(!state.pyramid.some(stage => stage.some(b => b))) {
        nextEvents.push(nextAge())
    }

    return nextEvents
}