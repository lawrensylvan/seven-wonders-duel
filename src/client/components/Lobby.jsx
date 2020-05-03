import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Lobby = ({tables, createTable, getAllTables}) => {

    useEffect(() => {
        getAllTables()
    }, [])

    const input = React.createRef()
    
    return <>
        <h2>Lobby</h2>

        <ul>
            {tables.map(t => (
                <li key={t.id}>
                    <Link to={`/table/${t.id}`}>Table #{t.id} ({t.players.length}/2 players)</Link> 
                </li>
            ))}
        </ul>

        <form onSubmit={(e) => {e.preventDefault(); createTable(input.current.value)}}>
            <input type="text" ref={input} placeholder="Enter your name"></input>
            <button>Create table</button>
        </form>
    </>
}

const mapStateToProps = (state, ownProps) => {
    return {
        tables: state.tables
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

    createTable: (name) => {
        dispatch({
            type: 'server/login',
            name: name
        })
        dispatch({
            type: 'server/createTable'
        })
    },

    joinTable: (name) => {
        dispatch({
            type: 'server/login',
            name: name
        })
        dispatch({
            type: 'server/joinTable'
        })
    },

    getAllTables: () => {
        dispatch({
            type: 'server/getAllTables'
        })
    }

})

const ConnectedLobby = connect(mapStateToProps, mapDispatchToProps)(Lobby)

export default ConnectedLobby