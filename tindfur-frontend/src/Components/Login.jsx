import './Login.css';
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

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
        <h2>Login Form</h2>
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
      </main>
      <Footer></Footer>
      <Routes>
        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} isShelter={isShelter} />}></Route>
      </Routes>
    </div>
  );
}

export default Login;