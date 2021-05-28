import { drawProgressTokens } from './drawProgressTokens'
import { drawWonders } from './drawWonders'
import { gainMoney } from './gainMoney'

export const startGame = () => {
    return function * (state) {
        
        yield drawProgressTokens(5)

        yield drawWonders(4)

        for(const player of state.players) {
            yield gainMoney(player, 7)
        }

    }
}