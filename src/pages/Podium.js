import React, { useEffect, useState } from 'react';
import axios from 'axios';
import goldTrophy from '../assets/images/trophy1.png';
import silverTrophy from '../assets/images/trophy2.png';
import bronzeTrophy from '../assets/images/trophy3.png';

const Podium = () => {
  const [topUsers, setTopUsers] = useState([
    { NAMES: 'N/A', POINTS: 0 },
    { NAMES: 'N/A', POINTS: 0 },
    { NAMES: 'N/A', POINTS: 0 }
  ]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get('https://api.master-bikas.com/api/top-points');
        setTopUsers(response.data); 
      } catch (error) {
        console.error('Error al obtener los usuarios con más puntos:', error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', padding: '30px 0px' }}>
      <h2 style={{ color: '#000' }}>PODIO DE USUARIOS CON MAS PUNTOS</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
        {/* Silver Trophy */}
        <div style={{ marginRight: '20px', textAlign: 'center' }}>
          <img src={silverTrophy} alt="Silver Trophy" style={{ height: '150px' }} />
          <p>{topUsers[1]?.NAMES || 'N/A'}</p>
          <p>{topUsers[1]?.POINTS || 0} puntos</p>
        </div>
        {/* Gold Trophy */}
        <div style={{ margin: '0 20px', textAlign: 'center' }}>
          <img src={goldTrophy} alt="Gold Trophy" style={{ height: '200px' }} />
          <p>{topUsers[0]?.NAMES || 'N/A'}</p>
          <p>{topUsers[0]?.POINTS || 0} puntos</p>
        </div>
        {/* Bronze Trophy */}
        <div style={{ marginLeft: '20px', textAlign: 'center' }}>
          <img src={bronzeTrophy} alt="Bronze Trophy" style={{ height: '150px' }} />
          <p>{topUsers[2]?.NAMES || 'N/A'}</p>
          <p>{topUsers[2]?.POINTS || 0} puntos</p>
        </div>
      </div>
    </div>
  );
};

export default Podium;
