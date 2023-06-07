import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import './Login.css';


const LoginPage = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);

      if (response.status === 200) {
       
        setLoginMessage('Login successful');
        navigate('/home') 
      } else {
       setLoginMessage("Failed to Login")
        navigate('/')
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginMessage("Failed to Login")
    }
  };



  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      navigate('/home');
    }else{
        navigate('/')
    }
  }, [navigate]);


  return (
   
     <div className="main">
     <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
     
      <p>
        Don't have an account? <Link to="/registration">Register here</Link>
      </p>
      <p>{loginMessage}</p>
    </div>
    </div>
  );
};

export default LoginPage;
