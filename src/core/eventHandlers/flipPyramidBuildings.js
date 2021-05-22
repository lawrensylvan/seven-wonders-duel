
export const flipPyramidBuildings = (state, {targetStage, buildingIndex}) => {

    // flip the cards up in the upper stage
    const topStage = state.pyramid[state.pyramid.indexOf(targetStage) - 1]
    if(topStage) {
        // find the top cards
        const offset = topStage.length - targetStage.length
        const topCardIndexes = [buildingIndex, buildingIndex + offset]
        const topCards = topCardIndexes.map(i => topStage[i]).filter(card => card)
        // filter only the top cards with no more children
        topCards.filter(topCard => {
            const topBuildingIndex = topStage.map(c => c?.building).indexOf(topCard?.building)
            const bottomTopCardIndexes = [topBuildingIndex, topBuildingIndex - offset]
            const bottomTopCards = bottomTopCardIndexes.map(i => targetStage[i]).filter(card => card)
            return !bottomTopCards.length
        }).forEach(topCard => delete topCard.faceDown)
    }

    return []
}