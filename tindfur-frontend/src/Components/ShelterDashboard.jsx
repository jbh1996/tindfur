import './Dashboard.css';
import Footer from './Footer';
import Header from './Header';
import { Link } from 'react-router-dom';
import News from './News';
import DashPets from './DashPets';
import { useNavigate } from 'react-router-dom';
import Newsfeed from './Newsfeed';


function ShelterDashboard({ isLoggedIn, isShelter }) {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
        <DashPets />
        <News />
      </main>
      <Footer />
    </div>
  );
}

export default ShelterDashboard;
