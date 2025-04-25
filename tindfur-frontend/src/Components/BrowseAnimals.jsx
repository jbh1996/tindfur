import Footer from './Footer';
import Header from './Header';
import Welcome from './Welcome';
import News from './News';
import './BrowseAnimals.css';
import { useJwt } from "react-jwt";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import testpets from '../temporarydata/testpets';
import AnimalBrowser from './AnimalBrowser';
import BrowsingFilter from './BrowsingFilter';




function BrowseAnimals() {
    

  const {isLoggedIn, isShelter} = userAuth()
  const navigate = useNavigate();

  


  return (
        <div>
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter}/>
      <main>
        <section className='browser'>
    <BrowsingFilter/>
      <AnimalBrowser/>
      </section>
      </main>
      <Footer></Footer>

    </div>
  );
}

export default BrowseAnimals;