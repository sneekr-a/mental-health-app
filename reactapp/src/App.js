import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import RegisterUser from './components/RegisterUser';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/register' element={<RegisterUser />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;