
export const GameState = (players) => {

    return {

        players: players,
        toPlay: players[0],

        militaryPosition: 0,
        progressTokens: ['law', 'economy', 'architecture', 'strategy', null],
        wondersToSelect: ['greatLibrary', null, 'mausoleum', 'pyramids'],

        getPublicState(player) {
            return this
        }

    }
}