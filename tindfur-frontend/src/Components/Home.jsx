import './Home.css';
import Footer from './Footer';
import Header from './Header';
import Welcome from './Welcome';
import News from './News';
import { useJwt } from "react-jwt";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';




function Home() {
    

  const {isLoggedIn, isShelter} = userAuth()
  const navigate = useNavigate();

  useEffect(() => {

    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate, isLoggedIn]);


  return (
        <div className="App">
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter}/>
      <main>
      <Welcome />
      <News />
      </main>
      <Footer></Footer>

    </div>
  );
}

export default Home;