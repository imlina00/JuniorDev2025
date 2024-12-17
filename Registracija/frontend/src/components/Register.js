import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    axios.post("http://localhost:3000/registracija", { email, password, role })
      .then(response => {
        setMessage('Registracija uspješna!');
      })
      .catch(error => {
        setMessage('Greška kod registracije');
      });
  };

  return (
    <div className="form-container-register">
      <h2>Registracija</h2>
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister}>Registriraj se</button>
      <p>{message}</p>
    </div>
  );
};

export default Register;
