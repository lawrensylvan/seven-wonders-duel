import _ from 'lodash'
import { expect } from '../trndgine/server/expect'

export const GameFlow = (state) => ({

    state : state,

    startGame : function * () {
        
        yield * this.drawProgressTokens(5)
        
        yield * this.drawWonders(4)

        for(let who of [0, 1, 1, 0]) {
            const player = this.state.players[who]
            yield expect(player, this.pickWonder)
        }
        
        yield * this.drawWonders(4)

        for(let who of [1, 0, 0, 1]) {
            const player = this.state.players[who]
            yield expect(player, this.pickWonder)
        }
        
        for(const player of this.state.players) {
            yield * this.gainMoney(player, 7)
        }
        // TODO : try ‘yield‘ on its own here instead of yield gainMoney twice

        for(let age of [1, 2, 3]) {
            this.state.age = age
            yield * this.fillPyramid()

            while(!this.state.pyramidIsEmpty()) {
                const player = this.state.players[this.state.toPlay]
                
                yield expect(player, this.buyBuilding, this.sellBuilding)
                
                yield * this.swapTurns()
            }
        }

        yield * this.endGame()
        
    },

    drawProgressTokens : function * (amount) {
        for(let i = 0; i < amount; ++i) {
            this.state.militaryBoard.progressTokens[i] = this.state.progressTokenDeck.pop()
        }
        yield
    },

    drawWonders : function * (amount) {
        for(let i = 0; i < amount; ++i) {
            this.state.wondersToSelect[i] = this.state.wonderDeck.pop()
        }
        yield
    },

    pickWonder: function * (player, {wonder}) {
        // check if move is valid
        if(!this.state.wondersToSelect.includes(wonder)) throw 'There is no such wonder'
        
        // move wonder from deck to player
        this.state.cityOf(player).wonders.push(wonder)
        this.state.wondersToSelect[this.state.wondersToSelect.indexOf(wonder)] = null
        yield
    },

    gainMoney : function * (player, coins) {
        this.state.cityOf(player).coins += coins
        yield
    },

    fillPyramid : function * () {

        // 1 = visible card, 0 = face down card, null = gap
        const pyramidStructure = {
            1: [
                    [1,1],
                   [0,0,0],
                  [1,1,1,1],
                 [0,0,0,0,0],
                [1,1,1,1,1,1],
            ]
            ,
            2: [
                [1,1,1,1,1,1],
                 [0,0,0,0,0],
                  [1,1,1,1],
                   [0,0,0],
                    [1,1]
            ],

            3: [
                    [1,1],
                   [0,0,0],
                  [1,1,1,1],
                  [0,null,0],
                  [1,1,1,1],
                   [0,0,0],
                    [1,1]
            ],
        }

        // shuffle age deck of building
        let ageBuildings = this.state.buildingDeck.filter(b => this.state.infosOn(b).age === this.state.age)

        // TODO : if age 3, pick 3 guilds out of 7
        
        // fill pyramid according to structure (null stands for empty spaces in pyramid between cards)
        this.state.pyramid = pyramidStructure[this.state.age].map(stage => stage.map(code => {
            if(code === null) return null
            const name = ageBuildings.pop()
            this.state.buildingDeck.splice(this.state.buildingDeck.indexOf(name), 1)
            if(code === 1) return {name}
            else return {name, isFaceDown: true}
        }))

        yield
    },

    buyBuilding: function * (player, {building}) {

        // check if the building is indeed in the pyramid
        const [stageId, buildingId] = this.state.coordsInPyramid(building)
        if(!stageId) {
            throw `The building ${building} is not in the pyramid`
        }

        // check if there is any building in the bottom stage that would block this building
        if(this.state.buildingsUnder(building).length) {
            throw `The building ${building} is not accessible from the pyramid`
        }
        
        const info = this.state.infosOn(building)
        let price = info.price ?? 0
        
        // check resource requirements
        if(info.requirements) {
            const requirements = info.requirements
            const production = this.state.productionOf(player)
            for(const requirement of requirements) {
                // search for the required resource in the production (either direct resource or from array of alternatives - coin OR wood for instance)
                // TODO : pick wisely which alternative resource to pick depending on the other needed resources
                const resourceId = production.findIndex(p => p === requirement || (Array.isArray(p) && p.includes(requirement)))
                if(resourceId > -1) {
                    production.splice(resourceId, 1) 
                } else {
                    // check if player has a special rate for that resource
                    const permanentEffect = this.state.cityOf(player).permanentEffects.filter(f => f.type === 'tradeResource' && f.resource === requirement)?.[0]
                    if(permanentEffect) {
                        price += permanentEffect.price
                    }
                    // if player doesn't produce resource and has no special rate
                    else {
                        // try to buy the resource for 2 coins + 1 coin per opponent resource on brown and gray cards only
                        const opponentProduction = this.state.productionOf(this.state.opponentOf(player), ['brown', 'gray'])
                        const opponentResourceCount = opponentProduction.filter(p => p === requirement).length
                        const resourcePrice = 2 + opponentResourceCount
                        price += resourcePrice
                    }
                }
            }
        }

        // check price and pay
        if(price > this.state.cityOf(player).coins) {
            throw `You don't have enough coin to buy the ${building}`
        }
        this.state.cityOf(player).coins -= price
        yield

        // move building from pyramid to player
        this.state.pyramid[stageId][buildingId] = null
        this.state.cityOf(player).buildings.push({name: building})
        yield

        yield * this.applyEffects(player, building)

        yield * this.flipPyramidBuildings(stageId, buildingId)
        
    },

    sellBuilding: function * (player, {building}) {
        // check if the building is indeed in the pyramid
        const [stageId, buildingId] = this.state.coordsInPyramid(building)
        if(!stageId) {
            throw `The building ${building} is not in the pyramid`
        }

        // check if there is any building in the bottom stage that would block this building
        if(this.state.buildingsUnder(building).length) {
            throw `The building ${building} is not accessible from the pyramid`
        }
        
        // move building from pyramid to discard pile
        this.state.pyramid[stageId][buildingId] = null
        this.state.discardPile.push(building)
        yield
        
        // give 1 coin + 1 more for each yellow card in player's city
        const yellowCardsCount = this.state.cityOf(player).buildings
            .map(b => this.state.infosOn(b.name))
            .filter(b => b.color === 'yellow')
            .length
        const reward = 2 + yellowCardsCount
        yield * this.gainMoney(player, reward)
    },

    applyEffects: function * (player, item) {
        const {immediateEffects, permanentEffects, scienceSymbol} = this.state.infosOn(item)

        // apply item common permanent effects (nothing to do for victory points or production, but still for science symbols)
        if(scienceSymbol) {
            const scienceSymbols = this.state.scienceSymbolsOf(player)
            // if player has 2 same similar symbols, he gets a progress token
            //if(scienceSymbols.some(s => s === scienceSymbol)) {
                yield expect(player, this.pickProgressToken)
            //}

            // if player has 6 different symbols, he wins instantly
            if(_.uniq(scienceSymbols).length >= 6) {
                //yield * scientificVictory(state.toPlay) TODO
            }
        }

        // apply item permanent special effects
        if(permanentEffects) {
            for(const effect of permanentEffects) {
                this.state.cityOf(player).permanentEffects.push({
                    source: item,
                    ...effect,
                })
            }
        }

        // apply item immediate effects
        if(immediateEffects) {
            for(const {type, ...args} of immediateEffects) {
                if(!this[type]) throw `Internal error : the "${type}" immediate effect of card ${item} is not defined in the rules !`
                yield * this[type](player, ...Object.values(args)) // we add player to effect properties to call the action
            }
        }
    },

    goMilitary: function * (player, amount) {
        let finalPosition = this.state.militaryBoard.conflictPawnPosition + (this.state.idOf(player) === 1 ? -1 : 1) * amount
        if(finalPosition > 9) finalPosition = 9
        if(finalPosition < -9) finalPosition = -9

        this.state.militaryBoard.conflictPawnPosition = finalPosition
        yield

        // TODO : lose money effects

        // TODO : military victory
        if(finalPosition === 9) {
            yield * this.militaryVictory(player)
            return
        }
        if(finalPosition === -9) {
            yield * this.militaryVictory(this.state.opponentOf(player))
        }
        
    },

    pickProgressToken: function * (player, {progressToken}) {
        // check if move is valid
        if(!this.state.militaryBoard.progressTokens.includes(progressToken)) throw 'There is no such progress token'
        
        // move token from deck to player
        this.state.cityOf(player).progressTokens.push(progressToken)
        this.state.militaryBoard.progressTokens[this.state.militaryBoard.progressTokens.indexOf(progressToken)] = null

        // apply tokens effect
        yield * this.applyEffects(player, progressToken) // TODO
    },

    flipPyramidBuildings: function * (stageId, buildingId) {
        // flip face up cards that are just on top of the card that was removed and that have no more cards beneath
        this.state
            .buildingsAboveCoords(stageId, buildingId)
            ?.filter(cardAbove => !this.state.buildingsUnder(cardAbove.name).length)
            .forEach(c => delete c.isFaceDown)
        yield
    },

    swapTurns: function * () {
        this.state.toPlay = this.state.toPlay === 1 ? 0 : 1
    },

    endGame : function * () {
        // TODO : count the victory points
        yield
    }

})