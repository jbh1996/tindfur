import './Dashboard.css';
import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import Home from './Home';
import ShelterDashboard from './ShelterDashboard';
import userAuth from '../Hooks/UserAuth';


function Dashboard() {

  const {isLoggedIn, isShelter} = userAuth()
  const navigate = useNavigate();

  return (
        <div className="App">
          <main>
    {
        isShelter ? (
            <ShelterDashboard isLoggedIn={isLoggedIn} isShelter={isShelter}/>
        ) : (<UserDashboard isLoggedIn={isLoggedIn} isShelter={isShelter}/>)
    }
      </main>

    </div>
  );
}

export default Dashboard;