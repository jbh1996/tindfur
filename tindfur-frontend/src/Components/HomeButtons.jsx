import './HomeButtons.css';
import {NavLink, Link}   from 'react-router-dom';

export default function HomeButtons() {
    return (
        <div className='HomeButtons'>
            <NavLink to="/login" className='logInButton'>Log in</NavLink>
            <NavLink to="/create" className='signUpButton'>Sign Up</NavLink>
        </div>
    )
}