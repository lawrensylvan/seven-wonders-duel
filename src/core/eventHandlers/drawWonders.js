import _ from 'lodash'
import allWonders from '../cardsInfos/wonders.json'

export const drawWonders = (amount) => {
    return function * (state) {

        const shuffledWonders = _.shuffle(allWonders)
        for(let i = 0; i < amount; ++i) {
            state.wondersToSelect[i] = shuffledWonders.pop().name
        }
        
    }
}