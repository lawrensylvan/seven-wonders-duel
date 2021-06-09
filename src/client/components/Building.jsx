import React from 'react'
import { Flipped } from 'react-flip-toolkit'

import buildingsInfos from '../../core/cardsInfos/buildings.json'
import { fadeIn } from '../../trndgine/client/animations'

export const Building = ({building, age, css, globalKey, onClick}) => {

    const isEmptySlot = building === null
    const name = building?.name
    const isUnknown = !name
    const isGuild = building?.isGuild
    
    const frontName =   isEmptySlot ? 'empty'   :
                        isUnknown   ? 'unknown' :
                        name

    const backName =    isEmptySlot ? 'empty' :
                        isGuild ? 'back-guild' :
                        age ? `back-${age}` : 'empty'

    const [frontImage, backImage] = [frontName, backName].map(n => require(`../assets/buildings/${n}.jpg`).default)
    const isFaceDown = building?.faceDown || isUnknown

    const style = {
        ...css,
    }

    if(isEmptySlot) {
        return <img className={`card building hidden`} src={frontImage} draggable="false" style={style} />
    }

    const flipId = isUnknown ? 'unknown'+age+globalKey : name
    const enterAnimation = fadeIn // TODO : should be enterBottomLeft if just flipped, fadeIn otherwise
    const exitAnimation = null // TODO : should be rotateOut but setting any exit animation seems to buggy
    const color = isGuild ? 'purple' : buildingsInfos.filter(b => b.name===name)?.[0]?.color
    const playable = !isUnknown && !isFaceDown

    return <Flipped flipId={flipId} onAppear={enterAnimation} onExit={exitAnimation} style={{perspective: "600px"}} transformOrigin="center" >
                <div className={`card3DContainer card building ${color} ${playable ? 'playable' : 'notplayable'}`} onClick={playable ? onClick : null} >
                    <img className="front" src={isFaceDown ? backImage : frontImage} draggable="false" style={style} />
                    <img className="back" src={isFaceDown ? frontImage : backImage} draggable="false" style={style}  />
                </div>
            </Flipped>

}