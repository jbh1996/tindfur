import './Welcome.css';
import { NavLink} from 'react-router-dom';


export default function Welcome() {
    return (
        <section className='Welcome'>
            <div className='welcome-text'>
                <h1>Welcome to Tindfur</h1>
                <p>We're here to help you find the pet that you've always wanted.
                    Shelters have set up profile for hundreds of animals looking for their forever homes. Create an account, set up your profile, and start browing pets today!</p>
            </div>
            <div className='home-buttons'>
                <NavLink to="/login" className='logInButton'>Log in</NavLink>
                <NavLink to="/create" className='signUpButton'>Sign Up</NavLink>
            </div>
        </section>
    )
}

{/* <a href="https://www.vecteezy.com/free-vector/animals">Animals Vectors by Vecteezy</a> */ }