import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faEdit, faNewspaper, faUser, faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons'



function Header(props) {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-fixed-top">
                <div className="container-fluid">
                    <a className="badge badge-primary" id="logo" href='/'><FontAwesomeIcon icon={faBlog} />     BlogoSepian</a>
                    <a className="badge badge-primary" id="username"> {props.mainToken && `Hi,  ${props.userDisplay.toUpperCase()}`}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link"  id="logo">{props.mainToken &&  <Link to='/Logout'><a ><FontAwesomeIcon icon={faUserTimes} />Logout</a></Link>}</a>
                        </li>
                        <li className="nav-item ">
                        <a className="nav-link" >{!props.mainToken && <Link to='/Login'><a ><FontAwesomeIcon icon={faUser} />  Login</a></Link>}</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" >{!props.mainToken && <Link to='/Register'><a ><FontAwesomeIcon icon={faUserEdit} />  Register</a></Link>}</a>
                        </li>
                        <li className="nav-item">
                        <h4 className="nav-link">{!props.mainToken && <Link to='/'><FontAwesomeIcon icon={faBlog} />  Blog</Link>}</h4>
                        </li>
                        {props.mainToken && <button className="btn btn-lg btn-dark" data-bs-toggle="modal" data-bs-target="#staticBlog" ><FontAwesomeIcon icon={faNewspaper} /> Create Blog</button>}
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

const mapStateToProps = (state)=>{
    return {
        state,
        userDisplay : state.username,
        mainToken: state.user_token != null ? true : false
    }

}


export default connect(mapStateToProps)(Header)
