import { applyEffects } from '../eventHandlers/applyEffects'

export const pickProgressToken = (player, {progressToken}) => {
    return function * (state) {

        // check if move is valid
        if(!state.militaryBoard.progressTokens.includes(progressToken)) throw 'There is no such progress token'
        
        // move token from deck to player
        state.cityOf(player).progressTokens.push(progressToken)
        state.militaryBoard.progressTokens[state.militaryBoard.progressTokens.indexOf(progressToken)]

        // apply tokens effect
        yield applyEffects(player, progressToken) // TODO

    }
}