import './Dashboard.css';
import Footer from './Footer';
import Header from './Header';

function UserDashboard({isLoggedIn, isShelter}) {
  return (
        <div className="App">
          <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
        <p>
            User Dashboard Info Goes Here
        </p>
      </main>
      <Footer></Footer>

    </div>
  );
}

export default UserDashboard;