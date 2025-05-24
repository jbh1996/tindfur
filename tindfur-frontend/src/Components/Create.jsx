import './Create.css';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';

function Create({ isLoggedIn, isShelter }) {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("user"); 
  const [emailPrefs, setEmailPrefs] = useState("no");


  // Create User Account
  const createAttempt = async (event) => {
    event.preventDefault();

    console.log(name,email,password,role)
  
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          emailPrefs: {
            newPetProfiles: role === 'user' ? emailPrefs === "yes" : false
          }
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


  
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />

      <main>
        <div className='accountCard'>
          <h1>Create Account</h1>
          <form onSubmit={createAttempt}>
            <label htmlFor="profile-type">Are you a shelter or an adopter:</label>
            <select id="profile-type" name="profile-type" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">Adopter</option>
              <option value="shelter">Shelter</option></select>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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

                  
            {role === "user" && (
              <>
                <label htmlFor="emailPrefs">Subscribe to email alerts for new pet profiles:</label>
                <select
                  id="emailPrefs"
                  value={emailPrefs}
                  onChange={(e) => setEmailPrefs(e.target.value)}
                >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
            </>
)}


            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
      <Footer></Footer>

    </div>
  );
}

export default Create;