import './HeaderSignedOut.css';
import {Link}   from 'react-router-dom';


function HeaderSignedInShelter() {
  
  const handleLogout = () => {
    localStorage.clear()
  }

  return (
      <header>
        <h1>
        <Link to="/dashboard">Home</Link>
        </h1>
        <Link to="/" onClick={handleLogout}>Log Out</Link>
        <h2>Hello Name Shelter</h2>

      </header>
  );
}

export default HeaderSignedInShelter;