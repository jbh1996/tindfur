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
import EditProfile from './Components/EditProfile';
import BrowseAnimals from './Components/BrowseAnimals';
import CreateAnimal from './Components/CreateAnimal';


function App() {

  return (
    <div>
    <Router>
    <main>
      <section>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/edit-profile" element={<EditProfile/>}></Route>
        <Route path="/create-animal" element={<CreateAnimal />}></Route>
        <Route path="/browse-animals" element={<BrowseAnimals/>}></Route>

        </Routes>
      </section>
    </main>
  </Router>
    </div>
  );
}

export default App;
