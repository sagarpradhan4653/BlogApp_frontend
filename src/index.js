import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import ReducerA from './Reducer/ReducerA';
import { Provider } from 'react-redux';



const initialStore = {
  user_token : null,
  user_id : null,
  username : null, //  this username for display the user who login 
  user_data : [],
  user_credentials : []
}


const store  = createStore(ReducerA,initialStore)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
