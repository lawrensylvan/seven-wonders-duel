export const selectWonder = (state, player, {wonder}) => ({

    isValid() {
        return state.toPlay === player
            && state.wondersToSelect.includes(wonder)
    },

    process() {
        const id = state.players.indexOf(player)
        // move wonder from deck to player
        state.cities[id].wonders.push(wonder)
        state.wondersToSelect[state.wondersToSelect.indexOf(wonder)] = null
        // player may pick a 2nd wonder if there are 2 wonders left
        const wondersLeft = state.wondersToSelect.filter(e => e !== null).length
        if(wondersLeft === 1 || wondersLeft === 3) {
            state.toPlay = state.players[id === 0 ? 1 : 0]
        }
    },

    toStep(p) {
        return {
            type: 'wonderSelected',
            player,
            wonder
        }
    },

    nextEvents() {
        return []
    }

})