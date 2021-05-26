import { _ } from 'lodash' 
import allBuildings from '../cardsInfos/buildings.json'
import * as eventCreators from '../events'

export const applyBuildingEffects = (state, {player, building}) => {
    
    const {immediateEffects, permanentEffects} = allBuildings.filter(b => b.name === building)[0]

    // TODO : add building permanent effects to player special powers
    if(permanentEffects) {
        
    }

    // apply building immediate effects
    if(immediateEffects) {
        return immediateEffects.map(effect => {
            const eventCreator = eventCreators[effect.type]
            if(!eventCreator) throw `The "${effect.type}" immediate effect of card ${building} is not defined in the rules !`
            const {type, ...args} = effect
            return eventCreator(player, ...Object.values(args)) // we add player to effect parameters to create an action
        })
    }
    
    return []
}