import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/'); // Redirect to the login page if token is not found
    }
  }, [navigate]);

  return (
   <div className='main'>
    <Navbar/>
    <div className="home-container">
      <h2 className="home-heading">Welcome to the Home Page</h2>
      {/* Home page content */}
    </div>
    </div>
  );
};

export default Home;
