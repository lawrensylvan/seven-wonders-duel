
export const GameState = (players) => {

    return {

        players: players,
        toPlay: players[0],
        board: [],

        getPublicState(player) {
            return this.board
        }

    }
}