import React, { useEffect, useState } from 'react';
import axios from 'axios';
import goldTrophy from '../assets/images/trophy1.png';
import silverTrophy from '../assets/images/trophy2.png';
import bronzeTrophy from '../assets/images/trophy3.png';

const Podium = () => {
  const [topUsers, setTopUsers] = useState([
    { username: 'N/A', points: 0 },
    { username: 'N/A', points: 0 },
    { username: 'N/A', points: 0 }
  ]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/top-points');
        setTopUsers(response.data); // Update with top users
      } catch (error) {
        console.error('Error al obtener los usuarios con más puntos:', error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px',padding: '30px 0px' }}>
      <h2 style={{ color: '#000' }}>Podio de Usuarios con más puntos</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
        {/* Silver Trophy */}
        <div style={{ marginRight: '20px', textAlign: 'center' }}>
          <img src={silverTrophy} alt="Silver Trophy" style={{ height: '150px' }} />
          <p>{topUsers[1]?.username || 'N/A'}</p>
          <p>{topUsers[1]?.points || 0} puntos</p>
        </div>
        {/* Gold Trophy */}
        <div style={{ margin: '0 20px', textAlign: 'center' }}>
          <img src={goldTrophy} alt="Gold Trophy" style={{ height: '200px' }} />
          <p>{topUsers[0]?.username || 'N/A'}</p>
          <p>{topUsers[0]?.points || 0} puntos</p>
        </div>
        {/* Bronze Trophy */}
        <div style={{ marginLeft: '20px', textAlign: 'center' }}>
          <img src={bronzeTrophy} alt="Bronze Trophy" style={{ height: '150px' }} />
          <p>{topUsers[2]?.username || 'N/A'}</p>
          <p>{topUsers[2]?.points || 0} puntos</p>
        </div>
      </div>
    </div>
  );
};

export default Podium;
