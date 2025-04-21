import './Navbar.css';
import {Link, NavLink}   from 'react-router-dom';


function NavbarSignedInUser() {
  const handleLogout = () => {
    localStorage.clear()
  }

  return (
      <nav className='Navbar'>
      <Link to="/dashboard" className='site-title'>Tindfur</Link>
      <ul>
        
        <li><NavLink to="/dashboard">Home</NavLink></li>
        <li><Link to="/browse-animals">View Animals</Link></li>
        <li><Link to="/view-messages">View Messages</Link></li>
        <li><Link to="/edit-profile">Edit Profile</Link></li>
        <li><NavLink to="/" className='login' onClick={handleLogout}>Log Out</NavLink></li>
        <li className='greet'>Hello Name</li>
        
      </ul>

      </nav>
  );
}

export default NavbarSignedInUser