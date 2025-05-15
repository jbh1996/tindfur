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
import ViewAnimals from './Components/ViewAnimals';
import CreateAnimal from './Components/CreateAnimal';
import ShelterPetProfile from './Components/ShelterPetProfile';
import UserPetProfile from './Components/UserPetProfile';
import ShelterMessages from './Components/ShelterMessages';
import ChatViewer from './Components/ChatViewer';


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
        <Route path="/browse-animals" element={<BrowseAnimals/>}></Route>
        <Route path="/view-animals" element={<ViewAnimals/>}></Route>
        <Route path="/view-animals/:id" element={<ShelterPetProfile/>}></Route>
        <Route path="/view-messages/:chatLogID" element={<ChatViewer/>}></Route>
        <Route path="/browse-animals/:id" element={<UserPetProfile/>}></Route>
        <Route path="/create-animal" element={<CreateAnimal/>}></Route>
        <Route path="/shelter-messages" element={<ShelterMessages/>}></Route>

        </Routes>
      </section>
    </main>
  </Router>
    </div>
  );
}

export default App;
