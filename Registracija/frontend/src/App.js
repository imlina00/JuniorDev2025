import React, { useState } from 'react';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import DataButtons from './components/DataButtons';
import './App.css';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
  };

  return (
    <div className="app-container">
      <h1>Dobrodošli u aplikaciju za registraciju/prijavu!</h1>
      <Register />
      <Login onLoginSuccess={handleLoginSuccess} />
      <DataButtons userRole={userRole} />
    </div>
  );
};

export default App;
