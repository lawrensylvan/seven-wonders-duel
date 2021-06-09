import React from 'react'
import { Flipped } from 'react-flip-toolkit'

import { enterBottomLeft, enterBottomRight, fadeOut } from '../../trndgine/client/animations'

export const Wonder = ({name, onClick, side, otherStyle}) => {

    const url = require(`../assets/wonders/${name || 'zeus'}.jpg`).default

    const style = {
        ...otherStyle,
        visibility: name ? 'visible' : 'hidden'
    }
    
    return <Flipped flipId={name} onExit={fadeOut} onAppear={side ? enterBottomRight : enterBottomLeft}>
        <img className="card wonder playable" src={url} draggable="false" style={style} onClick={onClick} />
    </Flipped>
}