export const addRandom = (state, event) => ({

    process() {
        state.board.push(event.value)
    },

    toStep(p) {
        return {
            type: 'GAME_ADDED_VALUE',
            value: event.value
        }
    },

    nextEvents() {
        return []
    }

})