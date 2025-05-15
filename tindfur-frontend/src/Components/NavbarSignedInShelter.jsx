import './Navbar.css';
import {NavLink, Link}   from 'react-router-dom';
import { LuMessageSquare } from "react-icons/lu";


function NavbarSignedInShelter() {
  
  const handleLogout = () => {
    localStorage.clear()
  }

  return (
    <nav className='Navbar'>
      <Link to="/dashboard" className='site-title'>Tindfur</Link>
      <ul>
        <li><NavLink to="/dashboard">Home</NavLink></li>
        <li><NavLink to="/create-animal">Create Animal</NavLink></li>
        <li><NavLink to="/view-animals">View Animals</NavLink></li>
        <li><NavLink to="/shelter-messages"><LuMessageSquare className='navIcon'/></NavLink></li>
        <li><NavLink to="/" className='login' onClick={handleLogout}>Log Out</NavLink></li>
      </ul>

  </nav>
  );
}

export default NavbarSignedInShelter;