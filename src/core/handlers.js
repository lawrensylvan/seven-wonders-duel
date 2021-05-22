import { selectWonder } from './moveHandlers/selectWonder'
import { buyBuilding } from './moveHandlers/buyBuilding'

import { nextAge } from './eventHandlers/nextAge'
import { applyBuildingEffects } from './eventHandlers/applyBuildingEffects'
import { flipPyramidBuildings } from './eventHandlers/flipPyramidBuildings'
import { endGame } from './eventHandlers/endGame'

export const moveHandlers = {
    selectWonder,
    buyBuilding
}

export const eventHandlers = {
    nextAge,
    applyBuildingEffects,
    flipPyramidBuildings,
    endGame
}