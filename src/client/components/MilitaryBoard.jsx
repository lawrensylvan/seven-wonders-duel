import React from 'react'
import { Flipped } from 'react-flip-toolkit'

export const MilitaryBoard = ({militaryPosition, children}) => {

    const board_url = require(`../assets/militaryBoard/board-h.png`).default
    const pawn_url = require(`../assets/militaryBoard/conflictPawn-v.png`).default

    /* To debug conflict pawn position :
    <div className="conflictPawnContainer">
        {[...Array(19).keys()].map(i => <img className="conflictPawn" src={pawn_url} draggable="false" style={{gridColumn: `${i}/${i+1}`}} />)}
    </div>
    */

    return <div id="board">

        <img className="militaryBoard" height={200} src={board_url} draggable="false" />

        <div className="conflictPawnContainer">
            <Flipped flipId="conflictPawn">
                <img className="conflictPawn" src={pawn_url} draggable="false"
                    style={{gridColumn: `${militaryPosition + 10}/${militaryPosition + 10 + 1}`}} />
            </Flipped>
        </div>
        
        {children.map((child, index) => React.cloneElement(child, { css: {
            position: 'absolute',
            left: 179 + index * 70,
            top: 11
        } }))}
        
    </div>
}
