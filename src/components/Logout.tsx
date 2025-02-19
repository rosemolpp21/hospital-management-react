import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout:React.FC = () => {
    const navigate=useNavigate();
    function handleMouseEvent(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
  <button id="dash-logout" type="submit" onClick={handleMouseEvent}>Logout</button>
  );
};

export default Logout;