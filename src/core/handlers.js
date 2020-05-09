import { buildCard } from "./moveHandlers/buildCard"
import { writeBoard } from "./moveHandlers/writeBoard"
import { addRandom } from './moveHandlers/addRandom'

export const moveHandlers = {
    buildCard,
    writeBoard
}

export const eventHandlers = {
    addRandom   
}