import _ from 'lodash'
import allTokens from '../cardsInfos/tokens.json'

export const drawProgressTokens = (amount) => {
    return function * (state) {

        const shuffledTokens = _.shuffle(allTokens)
        for(let i = 0; i < amount; ++i) {
            state.progressTokens[i] = shuffledTokens.pop().name
        }
        
    }
}