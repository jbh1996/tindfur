import './Dashboard.css';
import Footer from './Footer';
import Header from './Header';
import { Link } from 'react-router-dom';
import News from './News';
import DashPets from './DashPets';


function ShelterDashboard({ isLoggedIn, isShelter }) {
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />

      <main>
        
        <DashPets />
        <News />
      </main>
      <Footer></Footer>

    </div>
  );
}

export default ShelterDashboard;





