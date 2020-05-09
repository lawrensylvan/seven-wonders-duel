export const buildCard = (state, player, action) => ({
    
    isValid() {
        return
            state.toPlay.includes(action.player) &&
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