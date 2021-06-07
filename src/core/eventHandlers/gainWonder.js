export const gainWonder = (player, wonder) => {
    return function * (state) {
        console.log('begin of gainWonder()')
        // check if move is valid
        if(!state.wondersToSelect.includes(wonder)) throw 'There is no such wonder'
        // TODO : problem : we can't tell from here whose player has tried an illegal action
        
        // move wonder from deck to player
        state.cityOf(player).wonders.push(wonder)
        state.wondersToSelect[state.wondersToSelect.indexOf(wonder)] = null
        console.log('end of gainWonder()')
    }
}