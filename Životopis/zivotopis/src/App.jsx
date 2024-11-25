import React, { useEffect, useState, Component } from 'react';
import './App.css';
import Zivotopis from './components/Zivotopis';

function App() {
/*     const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [city, setCity] = useState('');
    const [job, setJob] = useState('');
    const [color, setColor] = useState('');
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // Dohvati ime
        fetch('http://localhost:3000/api/name')
            .then(response => response.json())
            .then(data => setName(data.name))
            .catch(error => console.error("Error fetching name:", error));

        // Dohvati grad
        fetch('http://localhost:3000/api/city')
            .then(response => response.json())
            .then(data => setCity(data.city))
            .catch(error => console.error("Error fetching city:", error));

        fetch('http://localhost:3000/api/job')
            .then(response => response.json())
            .then(data => setJob(data.job))
            .catch(error => console.error("Error fetching job:", error));
          
        fetch('http://localhost:3000/api/color')
            .then(response => response.json())
            .then(data => setColor(data.color))
            .catch(error => console.error("Error fetching color:", error));   

        fetch('http://localhost:3000/api/skills')
            .then(response => response.json())
            .then(data => setSkills(data))
            .catch(error => console.error("Error fetching skills:", error));

    }, []);
    // prva dva zadatka kada imamo nizove i pojedinačne stavke
 */    
    const [profile, setProfile] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const profileResponse = await fetch('http://localhost:3000/api/profile');
              const profileData = await profileResponse.json();

              const contactResponse = await fetch('http://localhost:3000/api/contact');
              const contactData = await contactResponse.json();
              setProfile({
                  ...profileData,
                  contact: contactData.contact, 
              });
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };

      fetchData();
  }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Zivotopis
                name={profile.name}
                dateOfBirth={profile.dateOfBirth}
                address={profile.address}
                city={profile.city}
                job={profile.job}
                color={profile.color}
                contact={profile.contact}
                skills={profile.skills} 
            />
        </div>
    );
}

export default App;
