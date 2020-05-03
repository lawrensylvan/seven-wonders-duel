import React from 'react'
import { useParams } from 'react-router-dom'

const Table = () => {
    const {id} = useParams()

    return <div><h2>Table {id}</h2></div>
}

export default Table