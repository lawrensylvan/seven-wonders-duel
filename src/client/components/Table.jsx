import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { actions } from '../store/actions'
import { Board} from './Board'

export const Table = () => {

    const id = parseInt(useParams().id) || 0 // in debug mode, no id param so we fake it as 0
    const session = useSelector(state => state.session)
    const table = useSelector(state => state.tables[id])
    const game = useSelector(state => state.games.filter(g => g.tableId === id)[0])

    const dispatch = useDispatch()
    
    // Get the initial/current game state from the server
    useEffect(() => {
        console.log('We will get game state !')
        dispatch(actions.getGameState(id))
    }, [])

    /*useEffect(() => {
        console.log('Game step added !')
        dispatch(actions.getGameState(id))
    }, [game && game.steps])*/ // we don't want to lead game state after playing anymore, we will wait for the game step to arrive
    
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

    const ActionSender = () => {
        return <form onSubmit={handleSubmit}>
            <textarea cols={40} value={move} onChange={(e)=>setMove(e.target.value)}></textarea><br/>
            <button>Send move request</button>
        </form>
    }

    return <>   

        <h2>Table #{id}</h2>

        {game && game.state && <Board state={game.state} />}
        
        <Link to='/lobby'>
            <button>{'<< '}Back to lobby</button>
        </Link>

    </>
}
