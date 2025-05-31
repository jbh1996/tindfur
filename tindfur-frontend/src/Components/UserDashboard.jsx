import './Dashboard.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import News from './News';
import UserDashWelcome from './UserDashWelcome'

import Header from './Header';

function UserDashboard({ isLoggedIn, isShelter }) {
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />

      <main>
        <UserDashWelcome></UserDashWelcome>
        <News />
      </main>
      <Footer></Footer>

    </div>
  );
}

export default UserDashboard;