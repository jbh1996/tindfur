import './HeaderSignedOut.css';
import {Link}   from 'react-router-dom';


function HeaderSignedInShelter() {
  return (
      <header>
        <h1>
        <Link to="/shelter-dashboard">Home</Link>
        </h1>
        <Link to="/">Log Out</Link>

      </header>
  );
}

export default HeaderSignedInShelter;