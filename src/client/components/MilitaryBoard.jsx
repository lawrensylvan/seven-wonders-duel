import React from 'react'
import { useDispatch } from 'react-redux'

export const MilitaryBoard = ({militaryPosition, children}) => {

    const board_url = require(`../assets/militaryBoard/board-h.png`).default
    const pawn_url = require(`../assets/militaryBoard/conflictPawn-v.png`).default

    const dispatch = useDispatch()
    
    return <div id="board">

        <img className="militaryBoard" height={200} src={board_url} draggable="false" />

        <img className="conflictPawn" src={pawn_url} draggable="false"
            onClick={()=>dispatch({type:'debug/advanceMilitary'})}
            style={{
            position: 'absolute',
            top: '40%',
            width: '4%',
            left: `calc( 44.5% + ${militaryPosition}*4.3%)`
        }} />

        {children.map((child, index) => React.cloneElement(child, { css: {
            position: 'absolute',
            left: 179 + index * 70,
            top: 11
        } }))}
        
    </div>
}
