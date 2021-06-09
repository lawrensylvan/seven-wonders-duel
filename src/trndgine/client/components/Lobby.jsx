import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/actions'

export const Lobby = () => {

    const session = useSelector(state => state.session)
    const tables = useSelector(state => state.tables)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getAllTables())
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
                        
                        <span>
                            Table #{t.id}
                            ({t.players.length}/2 players)
                            [{t.players.join(', ')}]
                        </span>

                        {!isMine &&
                            <button onClick={()=>notFull ? dispatch(actions.joinTable(t.id)) : null} autoFocus>
                                Join
                            </button>
                        }
                        {isMine && waiting4Ready && !iAmReady && 
                            <button onClick={()=>dispatch(actions.readyToPlay(t.id))} autoFocus>
                                Ready to play !
                            </button>
                        }
                        {isMine && isReady &&
                            <Redirect to={`/table/${t.id}/justStarted`} />
                        }
                        {isMine && inProgress &&
                            <Link to={`/table/${t.id}`}>
                                Resume game!
                            </Link>
                        }
                        
                    </li>
                )
            }
            )}
        </ul>

        <button onClick={()=>dispatch(actions.createTable())}>Create table</button>
    </>
}
