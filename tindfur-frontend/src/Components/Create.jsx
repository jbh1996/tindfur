import './Login.css';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';

function Create({isLoggedIn, isShelter}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState(""); //(PG) Add useState for role



  const createAttempt = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    // (PG) Added call to backend 
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          role 
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(`Registration failed: ${data.message}`);
      } else {
        alert('New Account Created!');
        
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  }


  // (PG) Added value={role}, onChange to set role, option value - Choose Account Type
  return (
        <div className="App">
          <Header isLoggedIn={isLoggedIn} isShelter={isShelter}/>
      <main>
      <h2>Create Account</h2>
        <form onSubmit={createAttempt}>
        <label for="profile-type">Are you a shelter or an adopter:</label>
        <select id="profile-type" 
        name="profile-type"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        >
        <option value="">Choose Account Type</option>
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required></input>
          <button type="submit">Submit</button>
        </form>
      </main>
      <Footer></Footer>

    </div>
  );
}

export default Create;