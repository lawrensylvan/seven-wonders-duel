
export const drawWonders = (amount) => {
    return function * (state) {

        for(let i = 0; i < amount; ++i) {
            state.wondersToSelect[i] = state.wonderDeck.pop()
        }
        
    }
}