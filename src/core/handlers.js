import { selectWonder } from './moveHandlers/selectWonder'
import { buyBuilding } from './moveHandlers/buyBuilding'
import { nextAge } from './eventHandlers/nextAge'

export const moveHandlers = {
    selectWonder,
    buyBuilding
}

export const eventHandlers = {
    nextAge
}