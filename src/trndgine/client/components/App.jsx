import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Lobby } from './Lobby'
import { Table } from './Table'
import { Login } from './Login'
import { DebugAnimation } from '../../../client/components/DebugAnimation'

export const App = () => {
    
    const session = useSelector(state => state.session)

    return (
    <Router>        
        <h1>Welcome to 7 Wonders Duel !</h1>

        <Switch>

            <Route exact path="/">
                <Redirect to='/login'/>
            </Route>

            <Route exact path="/login">
                <Login/>
            </Route>

            <Route exact path="/lobby">
                {session.isLoggedIn
                    ?   <Lobby/>
                    :   <Redirect to='/login'/>}
            </Route>
                    
            <Route exact path="/table/:id">
                {session.isLoggedIn
                        ?   <Table/>
                        :   <Redirect to='/login'/>}
            </Route>

            <Route exact path="/debug/game">
                <Table/>
            </Route>

            <Route exact path="/debug/animations">
                <DebugAnimation/>
            </Route>

        </Switch>
    </Router>
)}
