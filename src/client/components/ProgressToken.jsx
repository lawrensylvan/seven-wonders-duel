import React, { useState } from 'react'
import { Flipped } from 'react-flip-toolkit'
import { animateElementIn, animateElementOut } from '../../trndgine/client/animations'

export const ProgressToken = ({name, css}) => {
    if(!name) return null

    const [rotation] = useState(Math.round((Math.random() - 0.5) * 40))

    const url = require(`../assets/progressTokens/${name}.png`).default

    const style = {
        ...css,
        transform: `rotate(${rotation}deg)`
    }
    
    return <Flipped flipId={name} onExit={animateElementOut} onAppear={animateElementIn}>
        <img className="progressToken" src={url} width='60px' draggable="false" style={style} />
    </Flipped>
}