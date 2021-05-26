import React, { useState } from 'react'
import { Flipped } from 'react-flip-toolkit'
import { fadeIn, fadeOut } from '../../trndgine/client/animations'
import { v4 } from 'uuid'

export const Coins = ({amount, css}) => {
    
    const coin1 = require('../assets/coins/coin-1.png').default
    const coin3 = require('../assets/coins/coin-3.png').default
    const coin6 = require('../assets/coins/coin-6.png').default

    const availableChanges = [6, 3, 1]
    const urls = availableChanges.map(amount => require(`../assets/coins/coin-${amount}.png`).default)

    let rest = amount
    let result = [0, 0, 0]
    for(let i in availableChanges) {
        if(rest === 0) break
        result[i] = Math.floor(rest / availableChanges[i])
        rest = rest % availableChanges[i]
    }

    const items = result.flatMap((amount, i) => Array(amount).fill(i))

    const [rotation] = useState(Math.round((Math.random() - 0.5) * 40))
    const style = {
        transform: `rotate(${rotation}deg)`
    }

    return items.map((v, i) =>  <Flipped flipId={i} key={i} onAppear={fadeIn} onExit={fadeOut} style={style}>
                                    <img className={`coin${availableChanges[v]}`} src={urls[v]} draggable="false" />
                                </Flipped>)

}