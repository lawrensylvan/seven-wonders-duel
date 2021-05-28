
export const swapTurns = () => {
    return function * (state) {

        state.toPlay = state.toPlay === 1 ? 0 : 1

    }
}