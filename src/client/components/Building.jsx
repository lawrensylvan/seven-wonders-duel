import React, { useState } from 'react'
import { Flipped } from 'react-flip-toolkit'
import { animateElementIn, animateElementOut } from '../../trndgine/client/animations'

export const Building = ({name, age, css, globalKey, onClick}) => {

    const faceDown = !name || name === 'unknown'

    const url = faceDown
        ? require(`../assets/ages/age${age || 1}.jpg`).default
        : require(`../assets/buildings/${name || 'academy'}.jpg`).default

    const style = {
        ...css,
        visibility: name ? 'visible' : 'hidden'
    }

    return  <Flipped flipId={faceDown ? ('unknown'+globalKey) : name} onExit={animateElementOut} onAppear={animateElementIn}>
            {faceDown
                ? <img className="card building notplayable" src={url} draggable="false" style={style} />
                : <img className="card building playable" src={url} draggable="false" style={style} onClick={onClick} />
            }
            </Flipped>

    /*return <Flipped flipId={faceDown ? ('unknown'+globalKey) : name} onExit={animateElementOut} onAppear={animateElementIn}>
        <div className="pyramidCardContainer">
            {faceDown
                ? <img className="card building notplayable" src={url} draggable="false" style={style} />
                : <img className="card building playable" src={url} draggable="false" style={style} onClick={onClick} />
            }
        </div>
    </Flipped>*/
}