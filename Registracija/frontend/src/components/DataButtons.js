import React from 'react';
import axios from 'axios';

const DataButtons = ({ userRole }) => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/korisnik-podaci', {
        withCredentials: true
      });
      alert(response.data);
    } catch (error) {
      alert('Nemate pristup korisničkim podacima: ' + error.response.data);
    }
  };

  const fetchAdminData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin-podaci', {
        withCredentials: true
      });
      alert(response.data);
    } catch (error) {
      alert('Nemate pristup admin podacima: ' + error.response.data);
    }
  };

  return (
    <div className="data-buttons">
      {userRole === 'user' && (
        <button onClick={fetchUserData}>Dohvati korisničke podatke</button>
      )}
      {userRole === 'admin' && (
        <button onClick={fetchAdminData}>Dohvati admin podatke</button>
      )}
      {userRole && userRole !== 'admin' && userRole !== 'user' && (
        <p>Nemate pristup tim podacima.</p>
      )}
    </div>
  );
};

export default DataButtons;
