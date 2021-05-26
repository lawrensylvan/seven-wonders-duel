import { _ } from 'lodash' 

export const gainMoney = (state, {player, coins}) => {
    const id = state.players.indexOf(player)
    state.cities[id].coins += coins
    return []
}