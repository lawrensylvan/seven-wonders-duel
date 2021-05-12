import React, { useEffect, useState } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'
import anime from 'animejs'

let count = 0;

export const DebugAnimation = () => {

    const url1 = require(`../../assets/progressTokens/agriculture.png`).default
    const url2 = require(`../../assets/progressTokens/law.png`).default
    const url3 = require(`../../assets/progressTokens/strategy.png`).default
    const url4 = require(`../../assets/progressTokens/philosophy.png`).default
    const url5 = require(`../../assets/progressTokens/mathematics.png`).default
    const url6 = require(`../../assets/progressTokens/theology.png`).default

    const [state, setState] = useState([[url1, url2, url3], [url4, url5]])

    const move = () => {
        if(count == 0) {
            setState([[url1, url2, url3], [url4, url5, url6]]); // sth appears
        }
        else if(count == 1) {
            setState([[url1, url3], [url4, url5, url6]]); // sth disappears
        }
        else if(count == 2) {
            setState([[url1, url3, url5], [url4, url6]]); // sth changes player
        }
        else if(count == 3) {
            setState([[url1, url4, url5], [url3, url6]]); // 2 swaps player
        }
        else if(count == 4) {
            setState([[url1, url2, url3], [url4, url6]]); // appear + disappear + change
        }
        count++;
    }

    const animateElementOut = (el, i, onComplete) => {
        el.style.color = "red";
        anime({
          targets: el,
          opacity: 0,
          delay: i * 10,
          easing: "easeOutSine",
          complete: onComplete
        })
    }

    const animateElementIn = (el, i) => {
        anime({
          targets: el,
          opacity: 1,
          left: '240px',
          delay: i * 10,
          easing: "easeOutSine"
        })
    }

    const exitThenFlipThenEnter = ({
        hideEnteringElements,
        animateEnteringElements,
        animateExitingElements,
        animateFlippedElements
      }) => {
        hideEnteringElements();
        animateExitingElements()
          .then(animateFlippedElements)
          .then(animateEnteringElements);
      };

    return <>
    <div style={
        {
            display:'flex',
            flexDirection:'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>

        <Flipper flipKey={state} handleEnterUpdateDelete={exitThenFlipThenEnter}>

            <div id="containerTop">
                {state[0].map(url =>
                    <Flipped flipId={url} key={url} onExit={animateElementOut} onAppear={animateElementIn}>
                        <img src={url} width={100} style={{transform: "rotate(30deg)"}} />
                    </Flipped>)}
            </div>

            <div id="containerBottom">
                {state[1].map(url =>
                    <Flipped flipId={url} key={url} onExit={animateElementOut} onAppear={animateElementIn}>
                        <img src={url} width={100} />
                    </Flipped>)}
            </div>

        </Flipper>
    </div>

    <br/>
    
    <button onClick={() => {move()}}>Move !</button>

    </>

}