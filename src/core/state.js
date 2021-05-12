
export const GameState = (players) => {

    return {

        players: players,
        toPlay: players[0],

        militaryPosition: 0,
        progressTokens: ['law', 'economy', 'architecture', 'strategy', null],
        
        discardPile: [],

        wondersToSelect: ['greatLibrary', 'sphinx', 'mausoleum', 'pyramids'],
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
            return this
        }

    }
}