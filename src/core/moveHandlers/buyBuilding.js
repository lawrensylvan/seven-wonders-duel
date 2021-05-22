import { _ } from 'lodash'

import { nextAge, applyBuildingEffects, flipPyramidBuildings } from '../events'

export const buyBuilding = (state, player, {building}) => {

    // TODO : check if it's player turn

    // check that the building is indeed in the pyramid
    const targetStage = state.pyramid.filter(stage => stage.some(card => card?.building === building))?.[0]
    if(!targetStage) throw `The building ${building} is not in the pyramid`
    
    // check whether the next pyramid stage down has more or fewer slots
    const buildingIndex = targetStage.map(c => c?.building).indexOf(building)
    const bottomStage = state.pyramid[state.pyramid.indexOf(targetStage) + 1]
    if(bottomStage) {
        const offset = bottomStage.length - targetStage.length
        // check if there are cards on the next stage that would block from taking this card
        const bottomCardIndexes = [buildingIndex, buildingIndex + offset]
        const bottomCards = bottomCardIndexes.map(i => bottomStage[i]).filter(card => card)
        if(bottomCards.length) throw `The building ${building} is not accessible from the pyramid`
    }

    // TODO : check resource requirements

    // TODO : check price and pay

    // move building from pyramid to player
    state.pyramid[state.pyramid.indexOf(targetStage)][buildingIndex] = null
    const id = state.players.indexOf(player)
    state.cities[id].buildings.push(building)

    // TODO : replace the following by this :
    let nextEvents = [
        //applyBuildingEffects(player, building),
        flipPyramidBuildings(targetStage, buildingIndex)
    ]
    if(!state.pyramid.some(stage => stage.some(card => card))) {
        nextEvents.push(nextAge())
    }

    return nextEvents
}