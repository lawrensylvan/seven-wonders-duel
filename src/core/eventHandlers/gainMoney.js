
export const gainMoney = (player, coins) => {
    return function * (state) {

        state.cityOf(player).coins += coins
        
    }
}