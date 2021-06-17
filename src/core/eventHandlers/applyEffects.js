import { _ } from 'lodash'
import { expect } from '../../trndgine/server/expect'

import { gainMoney } from './gainMoney'
import { goMilitary } from './goMilitary'

import { pickProgressToken } from '../moveHandlers/pickProgressToken'

export const applyEffects = (player, item) => {

    const availableEffects = {
        gainMoney,
        goMilitary
    }

    return function * (state) {
        
        const {immediateEffects, permanentEffects, scienceSymbol} = state.infosOn(item)

        // apply item common permanent effects (nothing to do for victory points or production, but still for science symbols)
        if(scienceSymbol) {
            const scienceSymbols = state.scienceSymbolsOf(player)
            // if player has 2 same similar symbols, he gets a progress token
            if(scienceSymbols.some(s => s === scienceSymbol)) {
                yield expect(player, pickProgressToken)
            }

            // if player has 6 different symbols, he wins instantly
            if(_.uniq(scienceSymbols).length >= 6) {
                //yield scientificVictory(state.toPlay) TODO
            }
        }

        // apply item permanent special effects
        if(permanentEffects) {
            for(const effect of permanentEffects) {
                state.cityOf(player).permanentEffects.push({
                    source: item,
                    ...effect,
                })
            }
        }

        // apply item immediate effects
        if(immediateEffects) {
            for(const effect of immediateEffects) {
                const event = availableEffects[effect.type]
                if(!event) throw `Internal error : the "${effect.type}" immediate effect of card ${item} is not defined in the rules !`
                const {type, ...args} = effect
                yield event(player, ...Object.values(args)) // we add player to effect properties to call the action
            }
        }
        
    }
}