import React, { useState } from 'react'
import { Flipped } from 'react-flip-toolkit'
import { enterTopLeft, fadeOut } from '../../trndgine/client/animations'

export const ProgressToken = ({name, onClick, css = {}}) => {
    if(!name) return null

    const [rotation] = useState(Math.round((Math.random() - 0.5) * 40))

    const url = require(`../assets/progressTokens/${name}.png`).default

    // TODO : find out why rotation does not work with FLIP animations
    
    return  <Flipped flipId={name} onExit={fadeOut} onAppear={enterTopLeft}>
                <img className="progressToken" onClick={onClick}
                     src={url} width='60px' draggable="false"
                     style={{...css, transform: `rotate(${rotation}deg)`}} />
            </Flipped>
}