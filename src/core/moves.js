// TODO : use an action creator generator from moveHandlers to reduce copy paste ?

/* Beginning of the game */

export const pickWonder = (wonder) => ({
    type: 'pickWonder',
    wonder
})

/* Main turn actions */

export const buyBuilding = (building) => ({
    type: 'buyBuilding',
    building
})

export const sellBuilding = (building) => ({
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
const pickBrownBuildingToDestroy = (building) => ({
    type: 'selectBrownBuildingToDestroy',
    building
})

// circus maximus
const pickGrayBuildingToDestroy = (building) => ({
    type: 'selectGrayBuildingToDestroy',
    building
})

// great library or 2 similar green symbols
export const pickProgressToken = (progressToken) => ({
    type: 'pickProgressToken',
    progressToken
})

// mausoleum
const pickBuildingFromTrash = (building) => ({
    type: 'selectBuildingFromTrash',
    building
})
