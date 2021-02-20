import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Blog from './Component/Blog';
import Footer from './Component/Footer';
import Header from './Component/Header';
import Login from './Component/Login';
import Logout from './Component/Logout';
import Register from './Component/Register';





function App(props) { 

  useEffect(() => { // for setting token 
    props.autoStart()
  }, [])

  return (

    <div className="App" >
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path = '/' component={Blog} />
          <Route path= '/Login' component={Login}  />
          <Route path= '/Register' component={Register} />
          <Route path= '/Logout' component={Logout} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoStart: () => dispatch({ type: 'AUTH_START' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);