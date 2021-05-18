
export const GameState = (players) => {

    return {

        players: players,
        toPlay: players[0],

        militaryPosition: 0,
        progressTokens: ['law', 'economy', 'architecture', 'strategy', null],
        
        discardPile: [],

        wondersToSelect: ['greatLibrary', 'sphinx', 'mausoleum', 'pyramids'],

        pyramid: [],

        cities: [{
            builtWonders:       [],
            wonders:            [],
            buildings:          [],
            progressTokens:     [],
            coins:              7
        }, {
            builtWonders:       [],
            wonders:            [],
            buildings:          [],
            progressTokens:     [],
            coins:              7
        }],

        getPublicState(player) {
            let publicState = JSON.parse(JSON.stringify(this))
            // hide the buildings that should be face down in the pyramid
            publicState.pyramid = publicState.pyramid.map((stage, i) => i % 2 ? stage.map(building => 'unknown') : stage)
            return publicState
        }

    }
}