import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import accounts from './data/accounts';
import tokens from './data/tokens';
import Home from "./Components/Home";
import Login from './Components/Login';
import Create from './Components/Create';
import Dashboard from './Components/Dashboard';
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
          <Route path="/login" element={<Login tokens={tokens} accounts={accounts} />}></Route>
          <Route path="/create" element={<Create isLoggedIn={isLoggedIn} isShelter={isShelter} />}></Route>
          <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} isShelter={isShelter} />}></Route>
        </Routes>
      </section>
    </main>
  </Router>
    </div>
  );
}

export default App;
