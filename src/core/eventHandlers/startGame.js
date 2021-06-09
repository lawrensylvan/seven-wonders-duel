import { drawProgressTokens } from './drawProgressTokens'
import { drawWonders } from './drawWonders'
import { gainMoney } from './gainMoney'
import { fillPyramid } from './fillPyramid'
import { swapTurns } from './swapTurns'
import { endGame } from './endGame'

import { pickWonder } from '../moveHandlers/pickWonder'
import { buyBuilding } from '../moveHandlers/buyBuilding'

import { expect } from '../../trndgine/server/expect'

export const startGame = () => {
    return function * (state) {
        
        yield drawProgressTokens(5)

        yield drawWonders(4)
        for(let who of [0, 1, 1, 0]) {
            const player = state.players[who]
            yield expect(player, pickWonder)
        }
        
        yield drawWonders(4)
        for(let who of [1, 0, 0, 1]) {
            const player = state.players[who]
            yield expect(player, pickWonder)
        }

        for(const player of state.players) {
            yield gainMoney(player, 7)
        }
        // TODO : try ‘yield‘ on its own here instead of yield gainMoney twice

        for(let age of [1, 2, 3]) {
            state.age = age
            yield fillPyramid()

            while(!state.pyramidIsEmpty()) {
                const player = state.players[state.toPlay]
                
                yield expect(player, buyBuilding, pickWonder) // TODO : pickWonder just for testing multiple possible actions
                
                yield swapTurns()
            }
        }

        yield endGame()
        
    }
}