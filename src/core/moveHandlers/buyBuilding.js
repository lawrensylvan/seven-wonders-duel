import { applyEffects} from '../eventHandlers/applyEffects'
import { flipPyramidBuildings } from '../eventHandlers/flipPyramidBuildings'

export const buyBuilding = (player, {building}) => {
    return function * (state) {
        
        // check if the building is indeed in the pyramid
        const [stageId, buildingId] = state.coordsInPyramid(building)
        if(!stageId) {
            throw `The building ${building} is not in the pyramid`
        }

        // check if there is any building in the bottom stage that would block this building
        if(state.buildingsUnder(building).length) {
            throw `The building ${building} is not accessible from the pyramid`
        }
        
        const info = state.infosOn(building)
        let price = info.price ?? 0
        
        // check resource requirements
        if(info.requirements) {
            const requirements = info.requirements
            const production = state.productionOf(player)
            for(const requirement of requirements) {
                // search for the required resource in the production (either direct resource or from array of alternatives - coin OR wood for instance)
                // TODO : pick wisely which alternative resource to pick depending on the other needed resources
                const resourceId = production.findIndex(p => p === requirement || (Array.isArray(p) && p.includes(requirement)))
                if(resourceId > -1) {
                    production.splice(resourceId, 1) 
                } else {
                    // check if player has a special rate for that resource
                    const permanentEffect = state.cityOf(player).permanentEffects.filter(f => f.type === 'tradeResource' && f.resource === requirement)?.[0]
                    if(permanentEffect) {
                        price += permanentEffect.price
                    }
                    // if player doesn't produce resource and has no special rate
                    else {
                        // try to buy the resource for 2 coins + 1 coin per opponent resource on brown and gray cards only
                        const opponentProduction = state.productionOf(state.opponentOf(player), ['brown', 'gray'])
                        const opponentResourceCount = opponentProduction.filter(p => p === requirement).length
                        const resourcePrice = 2 + opponentResourceCount
                        price += resourcePrice
                    }
                }
            }
        }

        // check price and pay
        if(price > state.cityOf(player).coins) {
            throw `You don't have enough coin to buy the ${building}`
        }
        state.cityOf(player).coins -= price

        // move building from pyramid to player
        state.pyramid[stageId][buildingId] = null
        state.cityOf(player).buildings.push({name: building})

        yield applyEffects(player, building)

        yield flipPyramidBuildings(stageId, buildingId)
        
    }

}