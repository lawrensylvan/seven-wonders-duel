import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Table = ({games, getGameState, play}) => {
    
    const id = parseInt(useParams().id)
    const game = games[parseInt(id)]

    useEffect(() => {
        getGameState(id)
    }, [])

    const input = React.createRef()

    return <>   

        <h2>Table {id}</h2>
        <Link to='/lobby'>
            <button>Back to lobby</button>
        </Link>

        <h3>Game</h3>

        <pre>{JSON.stringify(game, null, 4)}</pre>

        <form onSubmit={(e) => {e.preventDefault(); play(id, JSON.parse(input.current.value))}}>
            <textarea ref={input}></textarea>
            <button>Login</button>
        </form>

    </>
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    return {
        session: state.session,
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