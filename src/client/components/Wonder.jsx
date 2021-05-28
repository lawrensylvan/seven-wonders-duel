import React, { useState } from 'react'
import { Flipped } from 'react-flip-toolkit'
import { enterBottomLeft, enterBottomRight, fadeOut } from '../../trndgine/client/animations'

export const Wonder = ({name, css, onClick, side}) => {

    const [rotation] = useState(Math.round((Math.random() - 0.5) * 10))

    const url = require(`../assets/wonders/${name || 'zeus'}.jpg`).default

    const style = {
        ...css,
        //transform: `rotate(${rotation}deg)`,
        visibility: name ? 'visible' : 'hidden'
    }
    
    return <Flipped flipId={name} onExit={fadeOut} onAppear={side ? enterBottomRight : enterBottomLeft}>
        <img className="card wonder playable" src={url} draggable="false" style={style} onClick={onClick} />
    </Flipped>
}