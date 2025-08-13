import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom"
import './App.css';

import Login from './pages/Login';

function App() {
  return (
    <div className="App">
        <Router>
          <div className='navbar'>
          <Link to="/Login"> Login</Link>
          <Link to="/"> Home</Link>
          </div>
        <Routes>
          <Route path="/Login" element={<Login/>} />
          <Route path="/"/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
