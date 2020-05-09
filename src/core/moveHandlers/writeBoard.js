export const writeBoard = (state, player, action) => ({

    isValid() {
        return state.toPlay == player
    },

    process() {
        state.board.push(action.value)
        const id = state.players.indexOf(player)
        state.toPlay = state.players[id === 0 ? 1 : 0]
    },

    toStep(p) {
        if(p == player) {
            return {
                type: 'YOU_ADDED_VALUE',
                value: action.value
            }
        } else {
            return {
                type: 'PLAYER_ADDED_VALUE'
            }
        }
    },

    nextEvents() {
        return [{
            type: 'addRandom',
            value: 'yoyo'
        }]
    }

})