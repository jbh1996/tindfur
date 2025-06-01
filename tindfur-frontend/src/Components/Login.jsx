import './Create.css';
import Footer from './Footer';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink} from 'react-router-dom';

function Login() {

  const token = localStorage.getItem("auth_token");
  const usertype = localStorage.getItem("user_type");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isShelter, setShelter] = useState(false)
  const navigate = useNavigate();

  
  const loginAttempt = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user_type", data.user_type);
  
        // Alert to confirm account type
        if (data.user_type === "shelter") {
          alert("You are logged in as a Shelter!");
        } else {
          alert("You are logged in as a User!");
        }
  
        navigate("/dashboard");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong.");
    }
  };


  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
        <div className='accountCard'>
          <h1>Log In</h1>
          <form onSubmit={loginAttempt}>
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
            <button type="submit">Submit</button>
          </form>
        </div>
        <p className='account-link'>New to Tindfur? <NavLink to="/create">Create Account</NavLink></p>
      </main>
      <Footer></Footer>
      <Routes>
        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} isShelter={isShelter} />}></Route>
      </Routes>
    </div>
  );
}

export default Login;