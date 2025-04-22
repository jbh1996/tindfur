import './Navbar.css';
import {NavLink, Link}   from 'react-router-dom';


function NavbarSignedInShelter() {
  
  const handleLogout = () => {
    localStorage.clear()
  }

  return (
    <nav className='Navbar'>
      <Link to="/dashboard" className='site-title'>Tindfur</Link>
      <ul>
        <li><NavLink to="/dashboard">Home</NavLink></li>
        <li><Link to="/create-animal">Create Animal</Link></li>
        <li><Link to="/view-animals">View Animals</Link></li>
        <li><NavLink to="/" className='login' onClick={handleLogout}>Log Out</NavLink></li>
      </ul>

  </nav>
  );
}

export default NavbarSignedInShelter;