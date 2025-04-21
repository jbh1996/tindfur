import NavbarSignedOut from './NavbarSignedOut';
import NavbarSignedInShelter from './NavbarSignedInShelter';
import NavbarSignedInUser from './NavbarSignedInUser';
import './Navbar.css';


function Header({isLoggedIn, isShelter}) {
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