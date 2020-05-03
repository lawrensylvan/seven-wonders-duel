import React, { useEffect, useState } from 'react'
import socketIO from 'socket.io-client'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Lobby from './Lobby'
import Table from './Table'

const App = () => (

    <Router>
        <h1>Welcome to 7 Wonders Duel !</h1>

        <Switch>

            <Route exact path="/">
                <Redirect to='/lobby'/>
            </Route>

            <Route exact path="/lobby">
                <Lobby/>
            </Route>
                      
            <Route exact path="/table/:id">
                <Table/>
            </Route>

        </Switch>
        
    </Router>

)

export default App