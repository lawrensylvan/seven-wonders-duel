import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Lobby = ({tables, createTable, joinTable, getAllTables, readyToPlay, session}) => {

    useEffect(() => {
        getAllTables()
    }, [])

    return <>
        <h2>Lobby</h2>

        <ul>
            {tables.map(t => {

                const me = session.name
                const isMine = t.players.includes(me)
                const iAmReady = t.playersReady.includes(me)
                const inProgress = t.status === 'IN_PROGRESS'
                const notFull = t.status === 'WAITING_FOR_MORE_PLAYERS'
                const waiting4Ready = t.status === 'WAITING_FOR_PLAYERS_READY'
                const isReady = t.status === 'READY_TO_START'
                
                return (
                    <li key={t.id}>
                            Table #{t.id} ({t.players.length}/2 players) [{t.players.join(', ')}]

                        {!isMine &&
                            <button onClick={()=>joinTable(t.id)}>Join</button>
                        }
                        {isMine && waiting4Ready && !iAmReady && 
                            <button onClick={()=>readyToPlay(t.id)}>Ready to play !</button>
                        }
                        {isMine && isReady &&
                            <Redirect to={`/table/${t.id}`} />
                        }
                        
                    </li>
                )
            }
            )}
        </ul>

        <button onClick={()=>createTable()}>Create table</button>
    </>
}

const mapStateToProps = (state, ownProps) => {
    return {
        session: state.session,
        tables: state.tables
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

    createTable: () => {
        console.log('Let s create table')
        dispatch({
            type: 'server/createTable'
        })
    },

    joinTable: (id) => {
        console.log('join table ' + id)
        dispatch({
            type: 'server/joinTable',
            tableId: id
        })
    },

    readyToPlay: (id) => {
        dispatch({
            type: 'server/readyToPlay',
            tableId: id
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