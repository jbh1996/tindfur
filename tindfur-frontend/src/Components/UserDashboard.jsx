import './Dashboard.css';
import Footer from './Footer';
import {Link}   from 'react-router-dom';

import Header from './Header';

function UserDashboard({isLoggedIn, isShelter}) {
  return (
        <div className="App">
          <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
      <nav>
        <Link to="/edit-profile">Edit Profile</Link>
        <Link to="/browse-animals">View Animals</Link>
        <Link to="/view-messages">View Messages</Link>
        </nav>
      <section className='News'>
      <h4>News</h4>
      See our latest profiles and adoptions below!
        <div>
          <h5>New Profile</h5>
          <h6>Joey</h6>
          <img src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Girl in a jacket" width="200" height="200"></img>
          </div>
          <div>
          <h5>New Adoption</h5>
          <h6>Frank</h6>
          <img src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Girl in a jacket" width="200" height="200"></img>
          </div>
      </section>
      </main>
      <Footer></Footer>

    </div>
  );
}

export default UserDashboard;