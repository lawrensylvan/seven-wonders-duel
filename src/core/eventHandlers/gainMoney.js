
export const gainMoney = (player, coins) => {
    return function * (state) {
        const id = state.players.indexOf(player)
        state.cities[id].coins += coins
    }
}