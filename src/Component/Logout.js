import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function Logout(props) {


    useEffect(() => {
        props.logOutDone() // when click on logout it automatically run the tokenkey will replace with null value

    }, [])
    return (
        <div>
            <h1>Logout</h1>
            <Redirect to="/Login" />

        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logOutDone: () => dispatch({ type: 'LOGOUT'})
    }
}

export default connect(null, mapDispatchToProps)(Logout)