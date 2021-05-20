/* Beginning of the game */

export const selectWonder = (wonder) => ({
    type: 'selectWonder',
    wonder
})

/* Main turn actions */

export const buyBuilding = (building) => ({
    type: 'buyBuilding',
    building
})

const sellBuilding = (building) => ({
    type: 'sellBuilding',
    building
})

const buildWonder = (wonder, building) => ({
    type: 'buildWonder',
    wonder,
    building
})

/* Effects of specific wonders */

// zeus
const selectBrownBuildingToDestroy = (building) => ({
    type: 'selectBrownBuildingToDestroy',
    building
})

// circus maximus
const selectGrayBuildingToDestroy = (building) => ({
    type: 'selectGrayBuildingToDestroy',
    building
})

// great library
const selectProgressToken = (progressToken) => ({
    type: 'selectProgressToken',
    progressToken
})

// mausoleum
const selectBuildingFromTrash = (building) => ({
    type: 'selectBuildingFromTrash',
    progressToken
})
