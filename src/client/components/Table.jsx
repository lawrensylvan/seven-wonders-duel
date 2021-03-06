import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/actions'
import "./Table.css"

export const Table = () => {

    const id = parseInt(useParams().id)
    const session = useSelector(state => state.session)
    const table = useSelector(state => state.tables[id])
    const game = useSelector(state => state.games[id])

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(actions.getGameState(id))
    }, [])

    useEffect(() => {
        alert('Game step added !')
    }, [game && game.steps])
    
    const [move, setMove] = useState('{"type":"writeBoard","value":"X"}')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(actions.play(id, JSON.parse(move)))
    }

    const Players = () => (
        <p>
            Players :
            {table.players.map(
                p => p == session.name ?
                    <b>{p} </b> :
                    <i>{p} </i>)}
        </p>
    )

    const GameSteps = () => {
        if(game && game.steps && game.steps.length > 0) {
            return <ul>
                {game.steps.map(s => <li>{JSON.stringify(s, null, 4)}</li>)}
            </ul>
        }
        return null
    }

    const GameState = () => {
        if(game && game.state) {
            return <pre style={{backgroundColor:'lightGray', border:'1px solid black'}}>
                {JSON.stringify(game.state, null, 4)}
            </pre>
        }
        return null
    }

    return <>   

        <h2>Table #{id}</h2>

        <Players/>

        <GameSteps/>

        <GameState/>

        <form onSubmit={handleSubmit}>
            <textarea cols={40} value={move} onChange={(e)=>setMove(e.target.value)}></textarea><br/>
            <button>Send move request</button>
        </form>

        <Link to='/lobby'>
            <button>{'<< '}Back to lobby</button>
        </Link>

    </>
}
