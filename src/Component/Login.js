import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt,faUser ,faKey} from '@fortawesome/free-solid-svg-icons'


function Login(props) {


    useEffect(()=>{
        if(props.mainToken){
            props.history.push('/')
        }
    },[props.mainToken])

    const handleSubmit = (e)=>{
        e.preventDefault()
        const userCredentialsLogin = {
            username : e.currentTarget['username'].value,
            password : e.currentTarget['password'].value
        }

        axios.post('http://127.0.0.1:8000/api-auth/',userCredentialsLogin)
        .then(response=>{
            console.log("token data",response.data);
            props.history.push('/')
            props.send_token_to_store(response.data)
        })

    }


    // const getIdUsername = ()=>{
    //     axios.get('http://127.0.0.1:8000/users/')
    // }





    return (
        <>
                <div id="login-container" className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-9">
                        <div className="card shadow-lg bg-success p-3 mb-5">
                            <div className="card-body p-4 p-md-5 mx-3 rounded ">
                                <h1><FontAwesomeIcon icon={faSignInAlt} />Login</h1><br/><br/><br/>
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
                                        <button className="btn btn-primary mt-3" type="submit">LOGIN</button>
                                    </div>
                                </form>
                            </div>                            
                        </div>
                    </div>
                </div> 
        </>
    )
}


const mapStateToProps = (state)=>{
    return{
        state,
        mainToken : state.user_token != null ? true:false
    }
}



const mapDispatchToProps =(dispatch)=>{
    return {
        send_token_to_store :val => dispatch({type:'TOKEN_SEND',payload:val})
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
