
export const goMilitary = (player, amount) => {
    return function * (state) {
        const id = state.players.indexOf(player)

        let finalPosition = state.militaryPosition + (id ? -1 : 1) * amount
        if(finalPosition > 9) finalPosition = 9
        if(finalPosition < -9) finalPosition = -9

        state.militaryPosition = finalPosition

        // TODO : military victory
        if(finalPosition === 9) {
            then.militaryVictory(id)
            return
        }
        if(finalPosition === -9) {
            then.militaryVictory(!id)
            return
        }
        // TODO : lose money effects
    }
}