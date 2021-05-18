import {applyCardBenefits} from '../events'

export const buyBuilding = (state, player, {building}) => {
    // TODO : check if move is valid
    
    // move building from pyramid to player
    const id = state.players.indexOf(player)
    state.cities[id].buildings.push(building)
    state.pyramid[4][state.pyramid[4].indexOf(building)] = null // TODO
    
    // TODO : take money and check resources

    // start next age phase if all buildings have been claimed
    // TODO : apply building benefits
    return state.pyramid.some(stage => stage.some(b => b !== null)) ? [] : [startAge(state.age + 1)]
}

/* This is an unused draft */
const buildCard = (state, player, action) => ({
    
    isValid() {
        return
            state.toPlay === action.player &&
            state.status === 'SHOULD_PLAY_TURN' &&
            state.getAccessibleCardsFromPyramid().includes(action.card)
    },

    process() {
        state.takeFromPyramid(action.card)
        state.addToPlayer(action.card, action.player)
    },

    toStep(player) {
        if(player === action.player) {
            return {
                type: 'YOU_BUILT_CARD',
                card: action.card,
                pyramid: state.getPublicState().pyramid
            }
        } else {
            return {
                type: 'OPPONENT_BUILT_CARD',
                card: action.card,
                pyramid: state.getPublicState().pyramid
            }
        }
    },

    nextEvents() {
        return cardLibrary.get(action.card).getEffects().map(effect => ({
            type: 'CARD_BENEFIT',
            beneficiary: player,
            benefit: effect,
        }))
    }

})