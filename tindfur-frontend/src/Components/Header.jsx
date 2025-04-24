import NavbarSignedOut from './NavbarSignedOut';
import NavbarSignedInShelter from './NavbarSignedInShelter';
import NavbarSignedInUser from './NavbarSignedInUser';
import './Navbar.css';
import userAuth from '../Hooks/UserAuth';


function Header() {

  const {isLoggedIn, isShelter} = userAuth()

  return (
        <>
        {isLoggedIn ? ( isShelter ? (
            <NavbarSignedInShelter/>) :
            (<NavbarSignedInUser/>)
        ) : (
            <NavbarSignedOut/>
        )}
        </>
  );
}

export default Header;