import { _ } from 'lodash' 
import allBuildings from '../../core/cardsInfos/buildings.json'

// 1 = visible card, 0 = face down card, null = gap
const pyramidStructure = {
    1: [
        [1,1,1,1,1,1],
         [0,0,0,0,0],           // stageDown.length - stage.length = -1     =>      n => [n-1, n]
          [1,1,1,1],            // 0 => [0]   1 => [0,1]    2 => [1,2]  3 => [2]
           [0,0,0],
            [1,1]
    ],
    
    2: [
            [1,1]
           [0,0,0],             // stageDown.length - stage.length = +1     =>      n => [n, n+1]
          [1,1,1,1],            // 0 => [0, 1]      1 => [1, 2]     2 => [2, 3]     3 => [3, 4]
         [0,0,0,0,0],
        [1,1,1,1,1,1],
    ],

    3: [
            [1,1]
           [0,0,0],             // -1       =>  n => [n-1, n]
          [1,1,1,1],            // 0 => [0]     1 => [0,1]
          [0,null,0],
          [1,1,1,1],
           [0,0,0],
            [1,1]
    ],
}

export const startAge = (state, {age}) => {
    // switch to next age
    state.age = age

    // shuffle age deck of building
    let ageBuildings = _.shuffle(allBuildings.filter(b => b.age === age))

    // TODO : if age 3, pick 3 guilds out of 7

    // fill pyramid according to structure (null stands for empty spaces in pyramid between cards)
    state.pyramid = pyramidStructure[age].map(stage => stage.map(code => {
        switch (code) {
            case 1: return {building: ageBuildings.pop().name}
            case 0: return {building: ageBuildings.pop().name, faceDown: true}
            case null: return null
        }}))

    /*state.pyramid = [
        ['academy', 'baths'],
        ['altar', 'apothecary', 'aqueduct'],
        ['archeryrange', 'arena', 'armory', 'arsenal'],
        ['barracks', null, 'brewery'],
        ['brickyard', 'tribunal', 'caravansery', 'baths'],
        ['chamberofcommerce', 'circus', 'claypit'],
        ['claypool', 'clayreserve']
    ]*/
    
    return []
}