import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import HomePage from './components/HomePage';
import Journals from './components/Journals'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('mmtoken'),
      userid: localStorage.getItem('mmuser')
    }
  }

  // Method for verifying the token

  render() {
    console.log("Current token: " + this.state.token);
    console.log("Current user: " + this.state.userid);
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/journals' element={<Journals />}/>
            <Route exact path='/register' element={<RegisterUser />} />
            <Route exact path='/login' element={<LoginUser />} />
            <Route exact path='*' element={<h4>Error 404. <a href="/">Return to safety!</a></h4>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;