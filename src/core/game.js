import { moveHandlers, eventHandlers } from "./handlers"
import { GameState } from "./state"

export const Game = (players, tableId) => {

    const state = GameState(players)

    return {

        id: tableId,
    
        getMoveProcessor : (player, move) => {
            const handler = moveHandlers[move.type]
            if(!handler) throw 'This move type does not exist'
            return handler(state, player, move)
        },

        getEventProcessor : (event) => {
            const handler = eventHandlers[event.type]
            if(!handler) throw 'This event type does not exist'
            return handler(state, event)
        },

        getGameState4 : (player) => {
            return state.getPublicState(player)
        }

    }
    
}