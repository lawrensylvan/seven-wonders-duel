// at the beginning of the game
export const selectWonder = (wonder) => ({
    type: 'selectWonder',
    wonder
})

export const buyBuilding = (building) => ({
    type: 'buyBuilding',
    building
})

/* The following is draft */

const sellCard = (card) => ({
    type: 'sellCard',
    card
})

const buildWonder = (wonder, card) => ({
    type: 'buildWonder',
    wonder,
    card
})

// effect of specific wonder or 2 same green symbols
const selectToken = (card, token) => ({
    type: 'selectToken',
    token
})

// effect of specific wonders
const selectCardFromTrash = (card) => ({
    type: '',
    card
})