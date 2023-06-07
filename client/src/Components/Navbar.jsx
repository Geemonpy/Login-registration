import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    const remove =()=>{

        localStorage.removeItem('token')
        navigate('/')
        console.log(localStorage.getItem('token'))
    }
  return (
    <nav className="navbar">
      
      <ul className="navbar-nav">
        <li className="nav-item">
        <button className='logout'  onClick={remove} >logout</button>
        </li>
       
      </ul>
    </nav>
  );
}

export default Navbar;
