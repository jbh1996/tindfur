import './Home.css';
import Footer from './Footer';
import Header from './Header';

function Home({isLoggedIn, isShelter}) {
  return (
        <div className="App">
          <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
      Home
      </main>
      <Footer></Footer>

    </div>
  );
}

export default Home;