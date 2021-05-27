import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { actions } from '../store/actions'
import { Board} from '../../../client/components/Board' // TODO : IOC

export const Table = () => {

    const id = parseInt(useParams().id) || 0 // in debug mode, no id param so we fake it as 0
    const session = useSelector(state => state.session)
    //const table = useSelector(state => state.tables[id])
    const game = useSelector(state => state.games.filter(g => g.tableId === id)[0])

    const dispatch = useDispatch()
    
    // Get the initial/current game state from the server
    useEffect(() => {
        dispatch(actions.getGameState(id))
    }, [])

    // Consume the game patches one by one with interval
    /*useEffect(() => {
        console.log('Will try to pop last game patch in 4 seconds')
        setTimeout(() => {
            console.log('4 seconds gone, now lets consume patch')
            dispatch({type: 'consumePatch'})
        }, 4000)
    }, [game?.steps?.length])*/

    return <>   
        {game && game.state && <Board state={game.state} player={session.name} />}
    </>
}
