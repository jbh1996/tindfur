import './Login.css';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';

function Create({isLoggedIn, isShelter}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  return (
        <div className="App">
          <Header isLoggedIn={isLoggedIn} isShelter={isShelter}/>
      <main>
      <h2>Create Account Form</h2>
        <form>
        <label for="profile-type">Are you a shelter or an adopter:</label>
        <select id="profile-type" name="profile-type">
        <option value="user">Adopter</option>
        <option value="shelter">Shelter</option></select>
        <label>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required></input>
          <label>Password</label>
          <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required></input>
          <label>Confirm Password</label>
          <input
          type="password"
          id="confirmPassword"
          value={password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required></input>
        </form>
      </main>
      <Footer></Footer>

    </div>
  );
}

export default Create;