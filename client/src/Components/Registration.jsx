import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import './Registration.css'


function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
      });
      
      setMessage('Registration successful');
      setName('');
      setEmail('');
      setPassword('');
     
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error('Error registering user:', error);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      navigate('/home');
    }else{
        navigate('/registration')
    }
  }, [navigate]);

  
  

  return (
    <div className="main">
    <div className="registration-container">
    <h2>Registration Form</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>
        Already have an account? <Link to="/">Login Here</Link>
      </p>
    {message && <p>{message}</p>}
  </div>
  </div>
  );
}

export default Registration;
