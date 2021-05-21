import { Building } from "../client/components/Building"

export const GameState = (players) => {

    return {

        players: players,
        toPlay: players[0],

        militaryPosition: 0,
        progressTokens: ['law', 'economy', 'architecture', 'strategy', null],
        
        discardPile: [],

        wondersToSelect: ['greatlibrary', 'sphinx', 'mausoleum', 'pyramids'],

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
            
            // replace the name of the buildings that should be face down in the pyramid by "faceDown"
            publicState.pyramid = publicState.pyramid.map(stage => stage.map(card => card?.faceDown ? 'faceDown' : card?.building))

            return publicState
        }

    }
}