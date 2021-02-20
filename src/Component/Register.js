import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt,faUser ,faKey} from '@fortawesome/free-solid-svg-icons'

function Register(props) {
    const [errorMsg, setErrorMsg] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        const userCredentialsRegister = {
            username: e.currentTarget['username'].value,
            password: e.currentTarget['password'].value
        }

        axios.post('https://blogappback.herokuapp.com/users/', userCredentialsRegister)
            .then(response => {
                console.log("user credential response", response.data);
                props.history.push('/Login') // push to login page

            })
            .catch(err=>{
                console.log(err.data)
                setErrorMsg("user is already exists !!")
                setInterval(() => {
                    setErrorMsg('')
                }, 2000);
                
            })
    
    }



    return (
        <>
            <div id="login-container" className="row justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-9">
                <h2>{errorMsg}</h2> 
                    <div className="card shadow-lg bg-primary p-3 mb-5">
                        <div className="card-body p-4 p-md-5 mx-3 rounded">
                        <h1><FontAwesomeIcon icon={faSignInAlt} />Register</h1><br/><br/><br/>
                                <form className="row g-6" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <label for="validationDefault01" className="form-label"><FontAwesomeIcon icon={faUser} /> Username</label>
                                        <input type="text" name="username" placeholder="Type Your Username" className="form-control" id="validationDefault01" required/>
                                    </div> 
                                    <div className="col-md-6">
                                        <label for="validationDefault02" className="form-label"><FontAwesomeIcon icon={faKey} /> Password</label>
                                        <input type="password" name="password" placeholder="Type Your Password" className="form-control" id="validationDefault02" required/>
                                    </div>
                                <div className="col-12 mt-4 " >
                                    <button className="btn btn-primary mt-3" type="submit">REGISTER</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        state,
        mainToken: state.user_token != null ? true : false
    }

}


export default connect(mapStateToProps)(Register)
