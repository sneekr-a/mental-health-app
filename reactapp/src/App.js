import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import './App.css';

import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import HomePage from './components/HomePage';

class App extends Component {

  // todo!
  componentDidMount(){

    setTimeout(() => {
      if( window.location.pathname != '/register' &&
          window.location.pathname != '/login'){
        
        // If our token exists
        if(token = localStorage.getItem('mmtoken')){    //this is throwing an error for me (Zac)

        }else{
          // Otherwise, redirect to login/register
        }
      }
    }, 0)
  }

  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/register' element={<RegisterUser />} />
            <Route exact path='/login' element={<LoginUser />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;