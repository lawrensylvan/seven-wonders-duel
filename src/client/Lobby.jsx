import React, { useEffect, useState } from 'react'
import io from './socket'
import { Redirect } from 'react-router-dom'

const Lobby = () => {

    const [tables, setTables] = useState([])
    const [redirectToTable, setRedirectToTable] = useState(null)

    useEffect(() => {
        console.log('Use effect')
        io.on('tableCreated', (table) => {
            setTables([...tables, table])
        })
    }, [tables])

    const input = React.createRef()
    const requestCreateTable = (e) => {
        e.preventDefault()
        io.emit('createTable', {name:input.current.value}, (result, data) => {
            if(result==='error') {
                console.error(error)
            }
            else {
                console.log('Hey')
                setRedirectToTable(data)
            }
        })
    }
    
    if(redirectToTable) {
        return <Redirect to={`/table/${redirectToTable}`}/>
    }

    return <>
        <h2>Lobby</h2>

        <ul>
            {tables.map(t => (
                <li>
                    Table #{t.id} ({t.players.length}/2 players)
                </li>
            ))}
        </ul>
        <form onSubmit={requestCreateTable}>
            <input type="text" ref={input} placeholder="Enter your name"></input>
            <button>Create table</button>
        </form>
    </>
}

export default Lobby