import './HeaderSignedOut.css';
import {Link}   from 'react-router-dom';


function HeaderSignedInUser() {
  return (
      <header>
        <h1>
        <Link to="/user-dashboard">Home</Link>
        </h1>
        <Link to="/">Log Out</Link>

      </header>
  );
}

export default HeaderSignedInUser