
export const applyStepOnGameState = (step, publicGameState) => {
    return {
        ...publicGameState,
        board: publicGameState.board.map((e,i) => i===step.index ? step.value : e)
    }
}

export const GameEngine = (players) => ({

    players: players,
    gameState: {
        board: [null, null, null, null, null, null, null, null, null]
    },
    steps: [],

    getPublicGameState4(player) {
        return this.gameState;
    },

    processMove(player, move) {
        this.gameState.board[move.index] = move.value
        this.steps.push(move)
    },

    getLastStep4(player) {
        return this.steps[this.steps.length-1]
    },

})
