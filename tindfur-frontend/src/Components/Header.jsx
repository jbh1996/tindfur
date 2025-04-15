import HeaderSignedOut from './HeaderSignedOut';
import HeaderSignedInShelter from './HeaderSignedInShelter';
import HeaderSignedInUser from './HeaderSignedInUser';
import './HeaderSignedOut.css';


function Header({isLoggedIn, isShelter}) {
  return (
        <>
        {isLoggedIn ? ( isShelter ? (
            <HeaderSignedInShelter/>) :
            (<HeaderSignedInUser/>)
        ) : (
            <HeaderSignedOut/>
        )}
        </>
  );
}

export default Header;