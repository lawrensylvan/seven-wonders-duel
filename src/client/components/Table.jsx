import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import "./Table.css";

const Table = ({session, tables, games, getGameState, play}) => {
    
    const id = parseInt(useParams().id)
    const game = games[parseInt(id)]
    const table = tables[parseInt(id)]

    useEffect(() => {
        getGameState(id)
    }, [])

    useEffect(() => {
        alert('Game step added !')
    }, [game && game.steps])

    const input = React.createRef()

    return <>   

        <h2>Table #{id}</h2>

        <h3>Game</h3>

        <p>Players : {table.players.map(p => p == session.name ? <b>{p} </b> : <i>{p} </i>)}</p>

        {game && game.step && <div className="step disappear">{JSON.stringify(game.steps)}</div>}

        <pre style={{backgroundColor:'lightGray', border:'1px solid black'}}>{JSON.stringify(game, null, 4)}</pre>

        <form onSubmit={(e) => {e.preventDefault(); play(id, JSON.parse(input.current.value))}}>
            <textarea cols={40} ref={input} value={'{"type":"writeBoard","value":"X"}'}></textarea><br/>
            <button>Send move request</button>
        </form>

        <Link to='/lobby'>
        <button>{'<< '}Back to lobby</button>
        </Link>

    </>
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    return {
        session: state.session,
        tables: state.tables,
        games: state.games
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

    getGameState: (tableId) => {
        dispatch({
            type: 'server/getGameState',
            tableId
        })
    },

    play: (tableId, move) => {
        dispatch({
            type: 'server/move',
            tableId,
            move
        })
    }

})

const ConnectedTable = connect(mapStateToProps, mapDispatchToProps)(Table)

export default ConnectedTable