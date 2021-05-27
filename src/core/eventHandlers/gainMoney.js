
export const gainMoney = (player, coins) => state => {
    const id = state.players.indexOf(player)
    state.cities[id].coins += coins
    return []
}