import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import CreateUser from './components/CreateUser';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/create-user' element={<CreateUser />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;