import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './Redux/Store.js';
import Container from './Component/Container/Container';
import Login from './Component/Login/Login';
import Registration from './Component/Registration/Registration';
import View from './Component/View/View';

function App() {
  return (
  
      <div className="App">
        <Router>
          {/* <ActionPopup /> */}
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
