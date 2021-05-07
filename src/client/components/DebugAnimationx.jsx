import React, { useEffect, useState } from 'react'

export const DebugAnimation = () => {

    const url1 = require(`../../assets/progressTokens/agriculture.png`).default
    const url2 = require(`../../assets/progressTokens/law.png`).default
    const url3 = require(`../../assets/progressTokens/strategy.png`).default
    const url4 = require(`../../assets/progressTokens/philosophy.png`).default
    const url5 = require(`../../assets/progressTokens/mathematics.png`).default
    const url6 = require(`../../assets/progressTokens/theology.png`).default

    const move = () => {
        setOffset(540)
    }

    const [offset, setOffset] = useState(0)

    return <>
    <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between',
alignItems: 'center'}}>

        <div id="containerTop" style={{border: '1px solid red'}}>
            <div style={{border: '1px solid black'}}>
                <img src={url1} width={100} />
            </div>
            <div style={{
                border: '1px solid black',
                position:'relative',
                left:`${offset}px`,
                transition: '4s ease-in-out'}}>
                <img src={url2} width={100} />
            </div>
            <div style={{border: '1px solid black'}}>
                <img src={url3} width={100} />
            </div>
        </div>

        <div id="containerBottom" style={{border: '1px solid red'}}>
            <div style={{border: '1px solid black'}}>
                <img src={url4} width={100} />
            </div>
            <div style={{border: '1px solid black'}}>
                <img src="" width={100} />
            </div>
            <div style={{border: '1px solid black'}}>
                <img src={url6} width={100} />
            </div>
        </div>
    </div>

    <br/><br/><br/>
    
    <button onClick={() => {move()}}>Move !</button>

    </>

}