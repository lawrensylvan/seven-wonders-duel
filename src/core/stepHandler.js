export const stepHandler = (step, state) => {
    switch (step.type) {
        case 'wonderSelected':
            /*const id = state.players.indexOf(step.player)
            // move wonder from deck to player
            state.cities[id].wonders.push(step.wonder)
            state.wondersToSelect[state.wondersToSelect.indexOf(step.wonder)] = null
            // player may pick a 2nd wonder if there are 2 wonders left
            const wondersLeft = state.wondersToSelect.filter(e => e !== null).length
            if(wondersLeft === 1 || wondersLeft === 3) {
                state.toPlay = state.players[id === 0 ? 1 : 0]
            }*/
            return {...state, wondersToSelect: ['mausoleum']}
        default:
            break;
    }
}