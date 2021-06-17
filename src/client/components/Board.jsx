import React from 'react'
import { Flipper } from 'react-flip-toolkit'
import { useDispatch } from 'react-redux'

import { actions } from '../../trndgine/client/store/actions'
import { pickWonder, buyBuilding, pickProgressToken } from '../../core/moves'

import { ProgressToken } from './ProgressToken'
import { MilitaryBoard } from './MilitaryBoard'
import { Building } from './Building'
import { Wonder } from './Wonder'
import { Coins } from './Coins'

import './Board.css'

export const Board = ({state, player}) => {

    const dispatch = useDispatch()

    const playerId = state.players.indexOf(player)

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

      const flipThenExitThenEnter = ({
        hideEnteringElements,
        animateEnteringElements,
        animateExitingElements,
        animateFlippedElements
      }) => {
        hideEnteringElements();
        animateFlippedElements()
          .then(animateExitingElements)
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
        <Flipper flipKey={state} handleEnterUpdateDelete={flipThenExitThenEnter} >
            <div id="all">

                {state.discard && 
                    <div id="discard">

                    </div>
                }
                
                {state.militaryBoard &&
                    <MilitaryBoard conflictPawnPosition={state.militaryBoard.conflictPawnPosition * (playerId ? -1 : 1)} >
                        {state.militaryBoard.progressTokens.map((token,i) => {
                            return <ProgressToken name={token} key={i}
                                                  onClick={()=>dispatch(actions.play(1, pickProgressToken(token)))} />
                        })}
                    </MilitaryBoard>
                }

                {state.wondersToSelect && state.wondersToSelect.length > 0 &&
                    <div id="wonderSelection">
                        {state.wondersToSelect.map((wonder, i) => {
                            return <Wonder name={wonder} key={i} side={i % 2}
                                           onClick={()=>dispatch(actions.play(1, pickWonder(wonder)))} /> // TODO : table id
                        })}
                    </div>
                }

                {state.pyramid && 
                    <div id="pyramid">
                        {state.pyramid.map((stage, stageIdx) => {
                            return <div className="pyramidStage" key={stageIdx}>
                                {stage.map((building, buildingIdx) => {
                                    return <Building    building={building} age={state.age}
                                                        key={buildingIdx} globalKey={stageIdx*10+buildingIdx}
                                                        onClick={()=>dispatch(actions.play(1, buyBuilding(building?.name)))}
                                            />
                                })}
                            </div>})
                        }
                    </div>
                }

                {state.cities?.[playerId] &&
                <>
                    <div className="coins">
                        <Coins amount={state.cities[playerId].coins} />
                    </div>
                    <div id="city1">
                        <div className="wonderContainer">
                            {state.cities[playerId].wonders.map((wonder, i) => <Wonder name={wonder} key={i} />)}
                        </div>
                        <div className="buildingContainer">
                            {state.cities[playerId].buildings.map((building, i) => <Building building={building} key={i} />)}
                        </div>
                        
                        
                    </div>
                </>
                }
                {state.cities?.[playerId ? 0 : 1] &&
                    <div id="city2">
                        {state.cities[playerId ? 0 : 1].wonders.map((wonder, i) => <Wonder name={wonder} key={i} />)}
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
