
export const expect = (player, ...moveHandlers) => {
    return {
        player: player,
        moveHandlers: moveHandlers
    }
}
