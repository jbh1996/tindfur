import './Create.css';
import Footer from './Footer';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ accounts, tokens }) {

  const token = localStorage.getItem("auth_token");
  const usertype = localStorage.getItem("user_type");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isShelter, setShelter] = useState(false)
  const navigate = useNavigate();

  /*
  if (token !== null) {
    for (let i = 0; i < tokens.length; i++) {
      if (token === tokens[i].token) {
          setLoggedIn(true)

      }
}}
  if (usertype !== null) {
    if (usertype === "shelter") {
        setShelter(true)
    }
}
    */


  const loginAttempt = async (event) => {
    event.preventDefault();
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].email === email && accounts[i].password === password) {
        if (accounts[i].email === "hopkjaco@oregonstate.edu") {
          const token = "aeiou"
          localStorage.setItem("auth_token", token);
          localStorage.setItem("user_type", "user");
          setLoggedIn(!isLoggedIn)
          console.log(isLoggedIn, isShelter)
        } else {
          const token = "abcde"
          localStorage.setItem("auth_token", token);
          localStorage.setItem("user_type", "shelter");
          setShelter(!isShelter)
          setLoggedIn(!isLoggedIn)
          console.log(isLoggedIn, isShelter, token)
        }
      }
    } navigate("/dashboard")
  }

  /*
    const loginAttempt = async (event) => {
      event.preventDefault();
        const response = await fetch('/backendlink', {
            method: 'post',
            body: JSON.stringify([email, password]),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.success){
          if (response.user) {
            redirect("/user-dashboard");
          } else {
            redirect("/shelter-dashboard");
          }
            alert(`Your entry was added`);
            redirect("/ledger");
        } else {
            alert(`There was a problem with you addition: = ${response.status}`);
        }
      setEmail("")
      setPassword("")
    }
  */


  /* (PG) To test login with backend, please delete
  const loginAttempt = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("/login", {
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
  */



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
      </main>
      <Footer></Footer>
      <Routes>
        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} isShelter={isShelter} />}></Route>
      </Routes>
    </div>
  );
}

export default Login;