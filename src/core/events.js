export const nextAge = (age) => ({
    type: 'nextAge',
    age
})

export const endGame = () => ({
    type: 'endGame'
})

/* Common effects of buildings, wonders and progress tokens */

export const gainMoney = (player, coins) => ({
    type: 'gainMoney',
    player,
    coins
})

export const goMilitary = (player, amount) => ({
    type: 'goMilitary',
    player,
    amount
})

/* Special effects of buildings */

// arena, builders guild
export const gainForBuiltWonders = (player, coins, inBothCities) => ({
    type: 'gainForBuiltWonders',
    player,
    coins,
    inBothCities
})

// armory, lighthouse, port, chamber of commerce
// guilds (magistrates, merchants, scientists, shipowners, tacticians)
export const gainForBuiltBuildings = (player, coins, inBothCities, colors) => ({
    type: 'gainForBuiltBuildings',
    player,
    coins,
    inBothCities,
    colors
})

// moneylenders guild
export const gainForCoins = (player, coins, inBothCities) => ({
    type: 'gainForCoins',
    player,
    coins,
    inBothCities
})

/* Effects of wonders */

// appian way, hanging gardens
export const playAgain = (player) => ({
    type: 'playAgain',
    player
})

// the appian way, piraeus, sphinx
export const destroyMoney = (player, coins) => ({
    type: 'destroyMoney',
    player,
    coins 
})

// circus maximus, zeus
export const offerBuildingDestruction = (player, color) => ({
    type: 'offerBuildingDestruction',
    player,
    color
})

// great library
export const offerProgressTokensFromTrash = (player, amount, outOf) => ({
    type: 'offerProgressTokensFromTrash',
    player,
    amount,
    outOf
})

// mausoleum 
export const offerBuildingFromTrash = (player, amount, isFree) => ({
    type: 'offerBuildingFromTrash',
    player,
    amount,
    isFree
})
