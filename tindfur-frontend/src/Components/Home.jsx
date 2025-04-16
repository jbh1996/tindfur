import './Home.css';
import Footer from './Footer';
import Header from './Header';



function Home({isLoggedIn, isShelter}) {
  return (
        <div className="App">
          <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
      <section className='Introduction'>
        Welcome to Tindfur! We're here to help you find the pet that you've always wanted. 
        Shelters have set up profile for hundreds of animals looking for their forever homes. Create an account, set up your profile, and start browing pets today! 
      </section>
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

export default Home;