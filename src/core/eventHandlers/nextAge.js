import { _ } from 'lodash' 
import allBuildings from '../cardsInfos/buildings.json'
import { endGame } from '../eventHandlers/endGame'

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

export const nextAge = () => {
    return function * (state) {

        // if end of age 3, end the game
        if(state.age === 3) {
            yield endGame()
        }

        // switch to next age
        state.age = (state.age ?? 0) + 1

        // shuffle age deck of building
        let ageBuildings = state.buildingDeck.filter(b => state.buildingInfosOn(b).age === state.age)

        // TODO : if age 3, pick 3 guilds out of 7
        
        // fill pyramid according to structure (null stands for empty spaces in pyramid between cards)
        state.pyramid = pyramidStructure[state.age].map(stage => stage.map(code => {
            if(code === null) return null
            const name = ageBuildings.pop()
            state.buildingDeck.splice(state.buildingDeck.indexOf(name), 1)
            if(code === 1) return {name}
            else return {name, isFaceDown: true}
        }))

        // TODO determine next player
        
    }
}