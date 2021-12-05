import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Axios from 'axios';

import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import HomePage from './components/HomePage';
import Authenticate from './components/Authenticate';

class App extends Component {
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

class Auth extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)

    this.state = {
      user: {
          email: '',
          password: ''
      },

      error: {
          message: '',
          code: ''
      },
      isloading: false,
      isLoginMode: true,

      errors: {
          email: '',
          password: ''
      }
    }
  }
}
export default App;