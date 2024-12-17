import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    axios.post("http://localhost:3000/prijava", { email, password }, { withCredentials: true })
      .then(response => {
        setMessage('Prijava uspješna!');
        const role = response.data.role;  
        onLoginSuccess(role); 
      })
      .catch(error => {
        setMessage('Greška kod prijave');
        console.error('Greška pri prijavi:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="form-container-login">
      <h2>Prijava</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Prijavi se</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
