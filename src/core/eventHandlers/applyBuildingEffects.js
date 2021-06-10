import { gainMoney } from './gainMoney'
import { goMilitary } from './goMilitary'

export const applyBuildingEffects = (player, building) => {

    const buildingEffects = {
        gainMoney,
        goMilitary
    }

    return function * (state) {
        
        const {immediateEffects, permanentEffects} = state.buildingInfosOn(building)
        
        if(permanentEffects) {
            for(const effect of permanentEffects) {
                state.cityOf(player).permanentEffects.push({
                    source: building,
                    ...effect,
                })
            }
        }

        // apply building immediate effects
        if(immediateEffects) {
            for(const effect of immediateEffects) {
                const event = buildingEffects[effect.type]
                if(!event) throw `Internal error : the "${effect.type}" immediate effect of card ${building} is not defined in the rules !`
                const {type, ...args} = effect
                yield event(player, ...Object.values(args)) // we add player to effect properties to call the action
            }
        }
        
    }
}