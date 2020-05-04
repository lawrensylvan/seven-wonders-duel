import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Login = ({session, login}) => {

    const user = React.createRef()
    const password = React.createRef()

    if(session.isLoggedIn) {
        return <Redirect to="/lobby"/>    
    }

    return <>
        <h2>Login or sign up</h2>

        <form onSubmit={(e) => {e.preventDefault(); login(user.current.value, password.current.value)}}>
            <input type="text" ref={user} placeholder="Enter your new/existing username"></input>
            <input type="password" ref={password} placeholder="Enter your new/existing password"></input>
            <button>Login</button>
        </form>
    </>
}

const mapStateToProps = (state, ownProps) => {
    return {
        session: state.session
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

    login: (name, password) => {
        dispatch({
            type: 'server/login',
            name: name
        })
    },

})

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin