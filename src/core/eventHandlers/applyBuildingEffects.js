import { _ } from 'lodash' 
import allBuildings from '../cardsInfos/buildings.json'
import { eventHandlers } from '../handlers'

export const applyBuildingEffects = (player, building) => {
    return function * (state) {
        const {immediateEffects, permanentEffects} = allBuildings.filter(b => b.name === building)[0]

        // TODO : add building permanent effects to player special powers
        if(permanentEffects) {
            
        }

        // apply building immediate effects
        if(immediateEffects) {
            for(const effect of immediateEffects) {
                const event = eventHandlers[effect.type]
                if(!event) throw `Internal error : the "${effect.type}" immediate effect of card ${building} is not defined in the rules !`
                const {type, ...args} = effect
                yield event(player, ...Object.values(args)) // we add player to effect properties to call the action
            }
        }
        
    }
}