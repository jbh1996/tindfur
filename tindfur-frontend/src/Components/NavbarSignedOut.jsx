import './Navbar.css';
import {NavLink, Link}   from 'react-router-dom';


function NavbarSignedOut() {
  return (
      <nav className='Navbar'>
        <Link to="/" className='site-title'>Tindfur</Link>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/create">Sign Up</NavLink></li>
          <li><NavLink to="/login" className='login'>Log in</NavLink></li>
        </ul>

      </nav>
  );
}

export default NavbarSignedOut;