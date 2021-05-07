import React, { useState } from 'react'
import { Flipped } from 'react-flip-toolkit'
import { animateElementIn, animateElementOut } from '../animations'

export const Wonder = ({name, css}) => {

    const [rotation] = useState(Math.round((Math.random() - 0.5) * 40))

    const url = require(`../../assets/wonders/${name || 'zeus'}.jpg`).default

    const style = {
        ...css,
        transform: `rotate(${rotation}deg)`,
        visibility: name ? 'visible' : 'hidden'
    }
    
    return <Flipped flipId={name} onExit={animateElementOut} onAppear={animateElementIn}>
        <img className="wonder" src={url} width='200px' draggable="false" style={style} />
    </Flipped>
}