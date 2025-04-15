import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./Components/Home";
import Login from './Components/Login';
import Create from './Components/Create';
import { useState } from 'react';
import UserDashboard from './Components/UserDashboard';
import ShelterDashboard from './Components/ShelterDashboard';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isShelter, setShelter] = useState(true)


  return (
    <div>
    <Router>
    <main>
      <section>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} isShelter={isShelter} />}></Route>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} isShelter={isShelter} />}></Route>
          <Route path="/create" element={<Create isLoggedIn={isLoggedIn} isShelter={isShelter} />}></Route>
          <Route path="/user-dashboard" element={<UserDashboard isLoggedIn={isLoggedIn} isShelter={isShelter} />}></Route>
          <Route path="/shelter-dashboard"  element={<ShelterDashboard isLoggedIn={isLoggedIn} isShelter={isShelter}/>}></Route>
        </Routes>
      </section>
    </main>
  </Router>
    </div>
  );
}

export default App;
