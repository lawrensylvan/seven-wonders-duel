import { drawProgressTokens } from './drawProgressTokens'
import { drawWonders } from './drawWonders'
import { gainMoney } from './gainMoney'
import { gainWonder } from './gainWonder'
import { fillPyramid } from './fillPyramid'
import { buyBuilding } from './buyBuilding'
import { swapTurns } from './swapTurns'
import { expect } from '../../trndgine/server/expect'

export const startGame = () => {
    return function * (state) {
        
        yield drawProgressTokens(5)

        /*yield drawWonders(4)
        for(let who of [0, 1, 1, 0]) {
            const player = state.players[who]
            const {wonder} = yield expect(player, ['selectWonder'])
            yield gainWonder(player, wonder)
        }
        
        yield drawWonders(4)
        for(let who of [1, 0, 0, 1]) {
            const player = state.players[who]
            const {wonder} = yield expect(player, ['selectWonder'])
            yield gainWonder(player, wonder)
        }*/

        for(const player of state.players) {
            yield gainMoney(player, 7)
        }

        for(let age of [1, 2, 3]) {
            state.age = age
            yield fillPyramid()

            while(!state.pyramidIsEmpty()) {
                const player = state.players[state.toPlay]
                
                yield expect(player, [buyBuilding])
                
                yield swapTurns()
            }
        }

        yield determineWinner()
        
    }
}