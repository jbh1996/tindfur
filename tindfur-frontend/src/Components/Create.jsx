import './Login.css';
import Footer from './Footer';
import Header from './Header';

function Create({isLoggedIn, isShelter}) {
  return (
        <div className="App">
          <Header isLoggedIn={isLoggedIn} isShelter={isShelter}/>
      <main>
        <p>
         Create
        </p>
      </main>
      <Footer></Footer>

    </div>
  );
}

export default Create;