import { nextAge } from '../eventHandlers/nextAge'
import { swapTurns } from '../eventHandlers/swapTurns'

export function * selectWonder(state, player, {wonder}) {
    // check if move is valid
    if(state.toPlay !== state.players.indexOf(player)) throw 'It is not your turn'
    if(!state.wondersToSelect.includes(wonder)) throw 'There is no such wonder'
    
    // move wonder from deck to player
    const id = state.players.indexOf(player)
    state.cities[id].wonders.push(wonder)
    state.wondersToSelect[state.wondersToSelect.indexOf(wonder)] = null
    
    // player may pick a 2nd wonder if there are 2 wonders left
    const wondersLeft = state.wondersToSelect.filter(e => e !== null).length
    if(wondersLeft === 1 || wondersLeft === 3) {
        yield swapTurns()
    }

    // start age 1 phase if all wonders have been claimed
    if(!wondersLeft) {
        yield nextAge()
    }
}