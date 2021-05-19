import React, { useState } from 'react'
import { Flipped } from 'react-flip-toolkit'
import { fadeIn, fadeOut, rotateOut } from '../../trndgine/client/animations'
import buildingsInfos from '../../core/cardsInfos/buildings.json'

export const Building = ({name, age, css, globalKey, onClick}) => {

    const faceDown = !name || name === 'faceDown'

    const url = faceDown
        ? require(`../assets/ages/age${age || 1}.jpg`).default
        : require(`../assets/buildings/${name || 'academy'}.jpg`).default

    const style = {
        ...css,
        visibility: name ? 'visible' : 'hidden'
    }

    const color = faceDown ? null : buildingsInfos.filter(i => i.name===name)[0].color

    return <Flipped flipId={faceDown ? ('faceDown'+globalKey) : name} onAppear={fadeIn} >
            {faceDown
                ? <img className={`card building notplayable`} src={url} draggable="false" style={style} />
                : <img className={`card building playable ${color}`} src={url} draggable="false" style={style} onClick={onClick} />
            }
            </Flipped>

}