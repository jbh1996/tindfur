import './Login.css';
import Footer from './Footer';
import Header from './Header';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login({isLoggedIn, isShelter}) {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();


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


  return (
        <div className="App">
          <Header  isLoggedIn={isLoggedIn} isShelter={isShelter}/>
      <main>
        <h2>Login Form</h2>
        <form>
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
        </form>
      </main>
      <Footer></Footer>

    </div>
  );
}

export default Login;