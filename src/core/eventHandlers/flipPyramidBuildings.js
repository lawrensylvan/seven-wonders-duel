
export const flipPyramidBuildings = (stageId, buildingId) => {
    return function * (state) {

        // flip face up cards that are just on top of the card that was removed and that have no more cards beneath
        state
            .buildingsAboveCoords(stageId, buildingId)
            ?.filter(cardAbove => !state.buildingsUnder(cardAbove.name).length)
            .forEach(c => delete c.isFaceDown)

    }
}