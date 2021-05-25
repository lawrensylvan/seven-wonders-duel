import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/actions'
import { v4 } from 'uuid'

export const Login = () => {

    const session = useSelector(state => state.session)
    const dispatch = useDispatch()
    
    const [user, setUser] = useState(v4().slice(0, 5))
    const [password, setPassword] = useState(v4().slice(0, 5))

    if(session.isLoggedIn) {
        return <Redirect to="/lobby"/>    
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(actions.login(user, password))
    }

    return <div className="login">
        <h2>Login or sign up</h2>

        <form onSubmit={handleSubmit}>

            <input type="text"
                value={user}
                onChange={(e)=>setUser(e.target.value)}
                placeholder="Enter your new/existing username"
                autoFocus>
            </input>
            
            <input type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your new/existing password">
            </input>

            <button>Login</button>

        </form>
    </div>
}
