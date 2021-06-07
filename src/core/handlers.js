import { buyBuilding } from './eventHandlers/buyBuilding'
import { applyBuildingEffects } from './eventHandlers/applyBuildingEffects'
import { endGame } from './eventHandlers/endGame'
import { flipPyramidBuildings } from './eventHandlers/flipPyramidBuildings'
import { gainMoney } from './eventHandlers/gainMoney'
import { goMilitary } from './eventHandlers/goMilitary'

// TODO : find sth to not have to list them all here

export const eventHandlers = {
    applyBuildingEffects,
    flipPyramidBuildings,
    endGame,
    gainMoney,
    goMilitary,
    buyBuilding
}