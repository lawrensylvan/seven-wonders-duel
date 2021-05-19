import { applyCardBenefits } from '../events'
import { _ } from 'lodash'
import { startAge } from '../eventHandlers/startAge'

export const buyBuilding = (state, player, {building}) => {
    // check that the building is indeed in the pyramid
    const targetStage = state.pyramid.filter(stage => stage.some(card => card?.building === building))?.[0]
    if(!targetStage) throw `The building ${building} is not in the pyramid`
    
    // check whether the next pyramid stage down has more or fewer slots
    const buildingIndex = targetStage.map(c => c?.building).indexOf(building)
    const bottomStage = state.pyramid[state.pyramid.indexOf(targetStage) + 1]
    if(bottomStage) {
        const offset = bottomStage.length - targetStage.length
        // check if there are cards on the next stage that would block from taking this card
        const bottomCardIndexes = [buildingIndex, buildingIndex + offset]
        const bottomCards = bottomCardIndexes.map(i => bottomStage[i]).filter(card => card)
        if(bottomCards.length) throw `The building ${building} is blocked by ${bottomCards.map(card => !card.faceDown && card.building)}`
    }

    // TODO : check resource requirements

    // TODO : check price and pay

    // move building from pyramid to player
    state.pyramid[state.pyramid.indexOf(targetStage)][buildingIndex] = null
    const id = state.players.indexOf(player)
    state.cities[id].buildings.push(building)

    // flip the cards up
    const topStage = state.pyramid[state.pyramid.indexOf(targetStage) - 1]
    if(topStage) {
        // find the top cards
        const offset = topStage.length - targetStage.length
        const topCardIndexes = [buildingIndex, buildingIndex + offset] // todo
        const topCards = topCardIndexes.map(i => topStage[i]).filter(card => card)
        // filter only the top cards with no more children
        topCards.filter(topCard => {
            const topBuildingIndex = topStage.map(c => c?.building).indexOf(topCard?.building)
            const bottomTopCardIndexes = [topBuildingIndex, topBuildingIndex - offset]
            const bottomTopCards = bottomTopCardIndexes.map(i => targetStage[i]).filter(card => card)
            return !bottomTopCards.length
        }).forEach(topCard => delete topCard.faceDown)
    }

    // TODO : apply benefits

    // TODO : start next age phase if all buildings have been claimed
    return state.pyramid.some(stage => stage.some(card => card)) ? [] : [startAge(state.age + 1)]
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