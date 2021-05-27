
export const goMilitary = (player, amount) => state => {
    const id = state.players.indexOf(player)

    let finalPosition = state.militaryPosition + (id ? -1 : 1) * amount
    if(finalPosition > 9) finalPosition = 9
    if(finalPosition < -9) finalPosition = -9

    // TODO : military victory
    //if(finalPosition === 9) return [militaryVictory(id)]
    //if(finalPosition === -9) return [militaryVictory(!id)]
    
    // TODO : lose money effects

    state.militaryPosition = finalPosition
    return []
}