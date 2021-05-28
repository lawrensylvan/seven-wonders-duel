import buildingsInfos from '../core/cardsInfos/buildings.json'

export const GameState = (players) => {

    return {

        players: players,
        toPlay: 0,

        militaryPosition: 0,
        progressTokens: [null, null, null, null, null],
        
        discardPile: [],

        wondersToSelect: [null, null, null, null],

        pyramid: [],

        cities: [{
            builtWonders:       [],
            wonders:            [],
            buildings:          [],
            progressTokens:     [],
            coins:              0
        }, {
            builtWonders:       [],
            wonders:            [],
            buildings:          [],
            progressTokens:     [],
            coins:              0
        }],

        getPublicState(player) {
            let publicState = JSON.parse(JSON.stringify(this))
            
            // hide the names of the buildings that are face down
            publicState.pyramid = publicState.pyramid.map(stage => stage.map(card => {
                return card === null ? null : {
                    name: card?.isFaceDown ? null : card?.name,
                    isFaceDown: card?.isFaceDown,
                    isGuild: buildingsInfos.filter(b=>b.age===publicState.age && b.color==='purple').map(b=>b.name).includes(card?.name)
                }
            }))
            return publicState
        }

    }
}