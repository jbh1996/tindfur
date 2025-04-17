import './Dashboard.css';
import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import Home from './Home';
import ShelterDashboard from './ShelterDashboard';

function Dashboard(isLoggedIn, isShelter) {

    const usertype = localStorage.getItem("user_type");
    const isShelterProfile = (usertype === "shelter")


  return (
        <div className="App">
          <main>
    {
        isShelter ? (
            <ShelterDashboard isLoggedIn={isLoggedIn} isShelter={isShelterProfile}/>
        ) : (<UserDashboard isLoggedIn={isLoggedIn} isShelter={isShelterProfile}/>)
    }
      </main>

    </div>
  );
}

export default Dashboard;