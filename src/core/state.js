import _ from 'lodash'

import buildingsInfos from '../core/cardsInfos/buildings.json'
import wondersInfos from '../core/cardsInfos/wonders.json'
import tokensInfos from '../core/cardsInfos/tokens.json'

export const GameState = (players) => ({

    /*** Game state structure ***/

    players: players,
    toPlay: 0,

    progressTokenDeck: _.shuffle(tokensInfos.map(t => t.name)),
    wonderDeck: _.shuffle(wondersInfos.map(w => w.name)),
    buildingDeck: _.shuffle(buildingsInfos.map(b => b.name)),

    militaryBoard : {
        conflictPawnPosition: 0,
        progressTokens: [null, null, null, null, null],
    },
    
    discardPile: [],

    wondersToSelect: [null, null, null, null],

    pyramid: [],

    cities: [{
        builtWonders:       [],
        wonders:            [],
        buildings:          [],
        progressTokens:     [],
        permanentEffects:   [],
        coins:              0
    }, {
        builtWonders:       [],
        wonders:            [],
        buildings:          [],
        progressTokens:     [],
        permanentEffects:   [],
        coins:              0
    }],

    /*** Game state structure ***/

    getPublicState4(player) {
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
    },

    /*** Utility functions ***/

    // Returns the id of a player from its name (or from its id, in which case it just returns that id)
    idOf(player) {
        return typeof player === 'number' ? player : this.players.indexOf(player)
    },

    // Returns the player's opponent
    opponentOf(player) {
        return this.idOf(player) === 1 ? 0 : 1
    },

    // Returns whether it is this player's turn
    isTurnOf(player) {
        const playerId = this.idOf(player)
        return this.toPlay === playerId
    },

    // Given a game item's name, returns the full object with all item's properties loaded from the json files
    infosOn(item) {
        return buildingsInfos.filter(b => b.name === item)?.[0] ||
                wondersInfos.filter(w => w.name === item)?.[0] ||
                tokensInfos.filter(t => t.name === item)?.[0]
    },

    // Returns an array [index of stage in pyramid, index of card in that stage] locating the card (or [-1, -1] if card is not in pyramid)
    coordsInPyramid(building) {
        const stage = this.pyramid.filter(s => s.some(b => b?.name === building))?.[0]
        const stageId = this.pyramid.indexOf(stage)
        const buildingId = stage?.map(b => b?.name).indexOf(building)
        return [stageId, buildingId]
    },

    // Returns an array with the cards that are under a given card in a pyramid, partly covering it
    buildingsUnder(building) {
        const [stageId, buildingId] = this.coordsInPyramid(building)
        const stage = this.pyramid[stageId]
        const stageDown = this.pyramid[this.pyramid.indexOf(stage) + 1]
        if(!stageDown) return []
        const offset = stageDown.length - stage.length
        const cardsDownIds = [buildingId, buildingId + offset]
        const cardsDown = cardsDownIds.map(i => stageDown[i]).filter(b => b) // filter out empty slots (null)
        return cardsDown
    },

    // Returns an array with the cards that are above a given card in a pyramid, partly covered by it
    buildingsAbove(building) {
        const [stageId, buildingId] = this.coordsInPyramid(building)
        return this.buildingsAboveCoords(stageId, buildingId)
    },

    // Returns an array with the cards that are above a given card in a pyramid, partly covered by it
    buildingsAboveCoords(stageId, buildingId) {
        const stage = this.pyramid[stageId]
        const stageUp = this.pyramid[this.pyramid.indexOf(stage) - 1]
        if(!stageUp) return []
        const offset = stageUp.length - stage.length
        const cardsUpIds = [buildingId, buildingId + offset]
        const cardsUp = cardsUpIds.map(i => stageUp[i]).filter(b => b) // filter out empty slots (null)
        return cardsUp
    },

    cityOf(player) {
        const playerId = this.idOf(player)
        return this.cities[playerId]
    },

    allItemsOf(player) {
        const city = this.cityOf(player)
        return [...city.buildings, ...city.builtWonders, ...city.progressTokens]
    },

    scienceSymbolsOf(player) {
        return this.allItemsOf(player).map(i => this.infosOn(i)?.scienceSymbol).filter(e => e)
    },

    productionOf(player, onlyFromColors) {
        const city = this.cityOf(player)
        const buildingsProduction = city.buildings
            .filter(b => !onlyFromColors || onlyFromColors.includes(b.color))
            .flatMap(b => this.infosOn(b.name)?.production)
            .filter(p => p)
        if(onlyFromColors) return buildingsProduction
        const wondersProduction = city.builtWonders
            .flatMap(w => this.wonderInfosOn(w)?.production)
            .filter(p => p)
        return [...buildingsProduction, ...wondersProduction]
    },

    pyramidIsEmpty() {
        return this.pyramid.every(stage => stage.filter(b => b).length === 0)
    }

})