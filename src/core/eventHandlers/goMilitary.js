
export const goMilitary = (player, amount) => {
    return function * (state) {
        
        let finalPosition = state.militaryBoard.conflictPawnPosition + (state.idOf(player) === 1 ? -1 : 1) * amount
        if(finalPosition > 9) finalPosition = 9
        if(finalPosition < -9) finalPosition = -9

        state.militaryBoard.conflictPawnPosition = finalPosition

        // TODO : lose money effects

        // TODO : military victory
        if(finalPosition === 9) {
            yield militaryVictory(player)
            return
        }
        if(finalPosition === -9) {
            yield militaryVictory(state.opponentOf(player))
            return
        }

    }
}