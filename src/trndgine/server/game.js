import { compare } from 'fast-json-patch'

import { moveHandlers } from '../../core/handlers' // TODO : IOC : we should pass the handler as an arg
import { GameState } from '../../core/state' // TODO : IOC
import { startGame } from '../../core/eventHandlers/startGame'

export const Game = (players, tableId) => {

    const state = GameState(players)
    let publicStates = {}
    let cachedPublicStates = {}

    return {

        id: tableId,

        getMoveProcessor(player, move) {
            const handler = moveHandlers[move.type]
            if(!handler) throw 'This move type does not exist'
            return handler(state, player, move)
        },

        computePublicStates() {
            publicStates = players.map(p => state.getPublicState(p))
        },

        getEventProcessor(event) {
            if(!event) throw 'Internal error : this game event does not exist'
            return event(state)
        },

        getGameState4 : (player) => {
            if(!publicStates[player]) {
                publicStates[player] = state.getPublicState(player)
            }
            cachedPublicStates[player] = publicStates[player]
            return publicStates[player]
        },

        getGameStatePatch4 : (player) => {
            const oldState = cachedPublicStates[player] || [] // todo : player is the name, should use id !
            if(!publicStates[player]) {
                publicStates[player] = state.getPublicState(player)
            }
            const newState = publicStates[player]
            const patch = compare(oldState, newState)
            cachedPublicStates[player] = publicStates[player]
            return patch
        },

        getFirstGameEvent : () => {
            return startGame() // TODO : IOC
        }

    }
    
}