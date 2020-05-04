import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Lobby from './Lobby'
import Table from './Table'
import Login from './Login'

const App = ({session}) => (
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
                <Table/>
            </Route>

        </Switch>
    </Router>
)

const mapStateToProps = (state, ownProps) => {
    return {
        session: state.session,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp