
export const drawProgressTokens = (amount) => {
    return function * (state) {
        
        for(let i = 0; i < amount; ++i) {
            state.militaryBoard.progressTokens[i] = state.progressTokenDeck.pop()
        }
        
    }
}