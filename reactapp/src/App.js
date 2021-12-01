import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import SideBar from './components/SideBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<SideBar />} />
            <Route exact path='/register' element={<RegisterUser />} />
            <Route exact path='/login' element={<LoginUser />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;