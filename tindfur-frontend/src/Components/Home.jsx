import './Home.css';
import Footer from './Footer';
import Header from './Header';
import Welcome from './Welcome';
import News from './News';



function Home({isLoggedIn, isShelter}) {
  return (
        <div className="App">
          <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
      <Welcome />
      <News />
      
      </main>
      <Footer></Footer>

    </div>
  );
}

export default Home;