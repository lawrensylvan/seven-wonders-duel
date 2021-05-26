import { selectWonder } from './moveHandlers/selectWonder'
import { buyBuilding } from './moveHandlers/buyBuilding'

import { nextAge } from './eventHandlers/nextAge'
import { applyBuildingEffects } from './eventHandlers/applyBuildingEffects'
import { endGame } from './eventHandlers/endGame'
import { flipPyramidBuildings } from './eventHandlers/flipPyramidBuildings'
import { gainMoney } from './eventHandlers/gainMoney'
import { goMilitary } from './eventHandlers/goMilitary'

export const moveHandlers = {
    selectWonder,
    buyBuilding
}

export const eventHandlers = {
    nextAge,
    applyBuildingEffects,
    flipPyramidBuildings,
    endGame,
    gainMoney,
    goMilitary
}