import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import EditProfile from './EditProfile';
import { useState } from 'react';
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";



function NavbarSignedInUser() {
  const handleLogout = () => {
    localStorage.clear()
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
        {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        <li><NavLink to="/dashboard">Home</NavLink></li>
        <li><NavLink to="/browse-animals">View Animals</NavLink></li>
        <li><NavLink to="/view-messages">View Messages</NavLink></li>
        <li><NavLink to="/edit-profile">Edit Profile</NavLink></li>
        <li><NavLink to="/" className='login' onClick={handleLogout}>Log Out</NavLink></li>

      </ul>
    </nav>
  );
}

export default NavbarSignedInUser