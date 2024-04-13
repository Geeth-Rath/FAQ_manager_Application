
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Container from './Component/Container/Container';
import Login from './Component/Login/Login';
import Registration from './Component/Registration/Registration';
import View from './Component/View/View';

function App() {
  return (
  
      <div className="App ">
        <Router>
       
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/content" element={<Container />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/view/:id" element={<View />} />
          </Routes>
        </Router>
      </div>
   
  );
}

export default App;
