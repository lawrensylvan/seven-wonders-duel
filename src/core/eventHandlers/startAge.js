export const startAge = (state, {age}) => {

    // create age pyramid
    state.age = age
    state.pyramid = [
        ['academy', 'baths'],
        ['altar', 'apothecary', 'aqueduct'],
        ['archeryrange', 'arena', 'armory', 'arsenal'],
        ['barracks', 'baths', 'brewery', 'brickyard', 'buildersguild'],
        ['caravansery', 'chamberofcommerce', 'circus', 'claypit', 'claypool', 'clayreserve']
    ]
    
    return []
}