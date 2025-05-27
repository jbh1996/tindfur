import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { LuMessageSquare } from "react-icons/lu";
import { useState } from 'react';
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";



function NavbarSignedInShelter() {

  const handleLogout = () => {
    localStorage.clear();
  }

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='Navbar'>
      <Link to="/dashboard" className='site-title'>Tindfur</Link>
      <div
        className='menu'
        onClick={() => {
          setMenuOpen(!menuOpen)
        }}>
        {menuOpen? <HiOutlineX /> : <HiOutlineMenu />}
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        <li><NavLink to="/dashboard">Home</NavLink></li>
        <li><NavLink to="/create-animal">Create Animal</NavLink></li>
        <li><NavLink to="/view-animals">View Animals</NavLink></li>
        <li><NavLink to="/edit-shelter">Edit Profile</NavLink></li>
        {/* <li><NavLink to="/shelter-messages"><LuMessageSquare className='navIcon' /></NavLink></li> */}
        <li><NavLink to="/shelter-messages">Messages</NavLink></li>
        <li><NavLink to="/" className='login' onClick={handleLogout}>Log Out</NavLink></li>
      </ul>

    </nav>
  );
}

export default NavbarSignedInShelter;