import { compare } from 'fast-json-patch'

import { moveHandlers, eventHandlers } from '../../core/handlers'
import { GameState } from '../../core/state'

export const Game = (players, tableId) => {

    const state = GameState(players)
    let publicStates = {}
    let cachedPublicStates = {}

    return {

        id: tableId,

        processMove(player, move) {
            const handler = moveHandlers[move.type]
            if(!handler) throw 'This move type does not exist'
            const nextEvents = handler(state, player, move)
            publicStates = players.map(p => state.getPublicState(p))
            return nextEvents
        },

        processEvent(event) {
            const handler = eventsHandlers[move.type]
            if(!handler) throw 'Internal error : this event type does not exist'
            const nextEvents = handler(state, event)
            publicStates = players.map(p => state.getPublicState(p))
            return nextEvents
        },

        getGameState4 : (player) => {
            if(!publicStates[player]) {
                publicStates[player] = state.getPublicState(player)
            }
            cachedPublicStates[player] = publicStates[player]
            return publicStates[player]
        },

        getGameStatePatch4 : (player) => {
            const oldState = cachedPublicStates[player] || []
            console.log('Here is old state for player ' + player)
            console.dir(oldState)
            if(!publicStates[player]) {
                publicStates[player] = state.getPublicState(player)
            }
            const newState = publicStates[player]
            console.log('Here is new state for player ' + player)
            console.dir(newState)
            const patch = compare(oldState, newState)
            console.dir(patch)
            cachedPublicStates[player] = publicStates[player]
            return patch
        },

    }
    
}