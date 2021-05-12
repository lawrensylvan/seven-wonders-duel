import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Flipper } from 'react-flip-toolkit'
import { actions } from '../store/actions'
import { selectWonder } from '../../core/moves'
import './Board.css'
import { MilitaryBoard } from './MilitaryBoard'
import { ProgressToken } from './ProgressToken'
import { Wonder } from './Wonder'

export const Board = ({state}) => {

    console.dir(state)
    const dispatch = useDispatch()

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

      const allTogether = ({
        hideEnteringElements,
        animateEnteringElements,
        animateExitingElements,
        animateFlippedElements
      }) => {
        hideEnteringElements();
        animateExitingElements()
        animateFlippedElements();
        animateEnteringElements();
      };

    return (
        <Flipper flipKey={state} handleEnterUpdateDelete={allTogether} >
            <div id="all">

                {state.discard && 
                    <div id="discard">

                    </div>
                }

                {state.progressTokens &&
                    <MilitaryBoard militaryPosition={state.militaryPosition} >
                        {state.progressTokens.map((token,i) => <ProgressToken name={token} key={i} />)}
                    </MilitaryBoard>
                }

                {state.wondersToSelect && state.wondersToSelect.length > 0 &&
                    <div id="wonderSelection">
                        {state.wondersToSelect.map((wonder, i) => {
                            return <Wonder name={wonder} key={i} onClick={()=>dispatch(actions.play(1, selectWonder(wonder)))} />
                        })}
                    </div>
                }

                {state.pyramid && 
                    <div id="pyramid">

                    </div>
                }

                {state.cities && state.cities[0] &&
                    <div id="city1">
                        {state.cities[0].wonders.map((wonder, i) => <Wonder name={wonder} key={i} />)}
                    </div>
                }

                {state.cities && state.cities[1] &&
                    <div id="city2">
                        {state.cities[1].wonders.map((wonder, i) => <Wonder name={wonder} key={i} />)}
                    </div>
                }

                {state.infos &&            
                    <div id="infos">
                        
                    </div>     
                }
            </div>
            
        </Flipper>
    )
}

/*

<div id="board">
                <img className="militaryBoard" height={200} src="https://drive.google.com/uc?id=15ymwgfrotxoMKMKlBWTAScGML8Ya9x20" draggable="false" />
                <img className="conflictPawn" style={{left: `calc( (50% - 0.9%) + ${pos}*4.8%)`}}
                    src="https://drive.google.com/uc?id=10BfV3OX6lWOiPHCetvoYUnS69pTy_NN3" draggable="false"
                    onClick={()=> setPos(pos+1)} />
            </div>

<MilitaryBoard position={state.militaryPosition} tokens={state.progressTokens}/>
<MilitaryBoard position={state.militaryPosition} tokens={state.progressTokens} id="board" />
<Trash cards={state.trash} />
<Pyramid age={state.age} cards={state.pyramid} />
<City player={state.city} mode="self" />
<City player={state.opponentCity} mode="opponent" />
*/

/*

return (
        <div id="all">
            <div id="discard"></div>
            <div id="board">
                <img className={css.militaryBoard} height={200} src="https://drive.google.com/uc?id=15ymwgfrotxoMKMKlBWTAScGML8Ya9x20" draggable="false" />
                <img className={css.conflictPawn} src="https://drive.google.com/uc?id=10BfV3OX6lWOiPHCetvoYUnS69pTy_NN3" draggable="false" />
            </div>
            <div id="pyramid"></div>

            <div id="city1"></div>

            <div id="city2"></div>

            <div id="infos"></div>
        
        </div>
    )
    */