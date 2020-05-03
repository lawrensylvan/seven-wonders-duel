import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import socketIO from 'socket.io-client'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Lobby from './Lobby'
import Table from './Table'
import store from '../store/store'

const App = () => (

    <Router>
        <Provider store={store}>
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
        </Provider>
    </Router>

)

export default App