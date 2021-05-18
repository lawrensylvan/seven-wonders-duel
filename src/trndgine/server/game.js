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
            const handler = eventHandlers[event.type]
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
            if(!publicStates[player]) {
                publicStates[player] = state.getPublicState(player)
            }
            const newState = publicStates[player]
            const patch = compare(oldState, newState)
            cachedPublicStates[player] = publicStates[player]
            return patch
        },

    }
    
}