import buildingsInfos from '../core/cardsInfos/buildings.json'

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