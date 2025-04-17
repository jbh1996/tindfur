import './HeaderSignedOut.css';
import {Link}   from 'react-router-dom';


function HeaderSignedOut() {
  return (
      <header>
        <h1>
          Tindfur
        </h1>
        <h1>
        <Link to="/login">Log In</Link>
        </h1>
        <h1>
        <Link to="/create">Create</Link>

        </h1>
        <h1>
        <Link to="/">Home</Link>

        </h1>

      </header>
  );
}

export default HeaderSignedOut;