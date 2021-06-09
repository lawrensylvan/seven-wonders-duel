export const pickWonder = (player, {wonder}) => {
    return function * (state) {

        // check if move is valid
        if(!state.wondersToSelect.includes(wonder)) throw 'There is no such wonder'
        
        // move wonder from deck to player
        state.cityOf(player).wonders.push(wonder)
        state.wondersToSelect[state.wondersToSelect.indexOf(wonder)] = null
        
    }
}