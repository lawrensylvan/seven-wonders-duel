import React from 'react'
import { useDispatch } from 'react-redux'
import { Flipper } from 'react-flip-toolkit'
import { actions } from '../../trndgine/client/store/actions'
import { selectWonder, buyBuilding } from '../../core/moves'
import './Board.css'
import { MilitaryBoard } from './MilitaryBoard'
import { ProgressToken } from './ProgressToken'
import { Building } from './Building'
import { Wonder } from './Wonder'

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

                {state.progressTokens &&
                    <MilitaryBoard militaryPosition={state.militaryPosition} >
                        {state.progressTokens.map((token,i) => <ProgressToken name={token} key={i} />)}
                    </MilitaryBoard>
                }

                {state.wondersToSelect && state.wondersToSelect.length > 0 &&
                    <div id="wonderSelection">
                        {state.wondersToSelect.map((wonder, i) => {
                            return <Wonder name={wonder} key={i} onClick={()=>dispatch(actions.play(1, selectWonder(wonder)))} /> // TODO : table id
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
                    <div id="city1">
                        <div className="wonderContainer">
                            {state.cities[playerId].wonders.map((wonder, i) => <Wonder name={wonder} key={i} />)}
                        </div>
                        <div className="buildingContainer">
                            {state.cities[playerId].buildings.map((building, i) => <Building building={building} key={i} />)}
                        </div>
                    </div>
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
