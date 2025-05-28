import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";


function NavbarSignedOut() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='Navbar'>
      <Link to="/" className='site-title'>Tindfur</Link>
      <div
        className='menu'
        onClick={() => {
          setMenuOpen(!menuOpen)
        }}>
        {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/create">Sign Up</NavLink></li>
        <li><NavLink to="/login" className='login'>Log in</NavLink></li>
      </ul>

    </nav>
  );
}

export default NavbarSignedOut;