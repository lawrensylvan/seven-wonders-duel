export const startAge = (age) => ({
    type: 'startAge',
    age
})

export const endGame = () => ({
    type: 'endGame'
})

/* Common effects of buildings, wonders and progress tokens */

const gainMoney = (player, coins) => ({
    type: 'gainMoney',
    player,
    coins
})

const goMilitary = (player, amount) => ({
    type: 'goMilitary',
    player,
    amount
})

/* Special effects of buildings */

// arena, builders guild
const gainForBuiltWonders = (player, coins, inBothCities) => ({
    type: 'gainForBuiltWonders',
    player,
    coins,
    inBothCities
})

// armory, lighthouse, port, chamber of commerce
// guilds (magistrates, merchants, scientists, shipowners, tacticians)
const gainForBuiltBuildings = (player, coins, inBothCities, colors) => ({
    type: 'gainForBuiltBuildings',
    player,
    coins,
    inBothCities,
    colors
})

// moneylenders guild
const gainForCoins = (player, coins, inBothCities) => ({
    type: 'gainForCoins',
    player,
    coins,
    inBothCities
})

/* Effects of wonders */

// appian way, hanging gardens
const playAgain = (player) => ({
    type: 'playAgain',
    player
})

// the appian way, piraeus, sphinx
const destroyMoney = (player, coins) => ({
    type: 'destroyMoney',
    player,
    coins 
})

// circus maximus, zeus
const offerBuildingDestruction = (player, color) => ({
    type: 'offerBuildingDestruction',
    player,
    color
})

// great library
const offerProgressTokensFromTrash = (player, amount, outOf) => ({
    type: 'offerProgressTokensFromTrash',
    player,
    amount,
    outOf
})

// mausoleum 
const offerBuildingFromTrash = (player, amount, isFree) => ({
    type: 'offerBuildingFromTrash',
    player,
    amount,
    isFree
})

/* Permanent effects */

// TODO : choose how to handle those
// stone/clay/wood reserve, ...
// ...custom house: enableTrade(player, resource, price)
// architecture :   reduceWonderRequirements(player, amount)
// masonry :        reduceBuildingRequirements(player, color, amount)
// economy :        payAllToOpponent (player)
// mathematics :    victoryPointsPerToken (player, amount=3)
// urbanism :       gainOnEachChaining (player, amount=4)
// theology :       replayOnEachWonder (player)
// strategy :       goExtraMilitary (player, amount=1)