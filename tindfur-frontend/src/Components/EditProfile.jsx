import './EditProfile.css';
import Footer from './Footer';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import AWS from 'aws-sdk';


function EditProfile() {

const S3_BUCKET = 'tindfurpics'
const REGION = 'us-east-2'
const ACCESS_KEY = 'AKIAQ67UMANZD45XFBJI';
const SECRET_ACCESS_KEY = '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';

const {isLoggedIn, isShelter} = userAuth()
const [username, setUsername] = useState("");
const [description, setDescription] = useState("")
const [dogsOwned, setDogsOwned] = useState(0);
const [catsOwned, setCatsOwned] = useState(0);
const [otherOwned, setOtherOwned] = useState(0);
const [uploadPic, setUploadPic] = useState(null);

const redirect = useNavigate("")

const handlePicUpload = (event) => {
    setUploadPic(event.target.files[0]);
}

const UploadForm= (event) => {
    setUploadPic(event.target.files[0]);
}

  const uploadProfilePic = async (event) => {
    event.preventDefault();

    let profilePicUrl = "";

    // Upload image to backend if a new one was selected
    if (uploadPic) {
      const formData = new FormData();
      formData.append("userpic", uploadPic);

      try {
        const res = await fetch("http://localhost:5600/uploadpics", {
          method: "POST",
          body: formData
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Image upload failed');
        }

        const data = await res.json();
        profilePicUrl = data.imageUrl;
      } catch (error) {
        console.error('Image upload failed:', error.message);
        return;
      }
    }

    // Update account details as before
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      const updates = {
        username,
        description,
        dogsOwned,
        catsOwned,
        otherOwned,
        profilePic: profilePicUrl
      };

      const res = await fetch(`http://localhost:5600/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const result = await res.json();
      console.log('Profile updated successfully:', result);

      redirect('/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error.message);
    }
  };


useEffect (() => {
    const {isLoggedIn, isShelter} = userAuth()
    if (!isLoggedIn) {
        redirect("/login")
    }
}, [redirect]);

return ( 
    <div className="App">
      <Header/>
      <main>
        <div className='accountCard'>
          <h1>Edit Profile</h1>
          <form onSubmit={uploadProfilePic}>
            <label>Username</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ></input>
            <label>Description</label>
            <textarea
              type="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              ></textarea>
            <label >How Many Dogs Do You Own?</label>
            <select id="dogsowned" name="dogsowned" value={dogsOwned} onChange={(e) => setDogsOwned(e.target.value)}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4+</option></select>
            <label>How Many Cats Do You Own?</label>
            <select id="catsowned" name="catsowned" value={catsOwned} onChange={(e) => setCatsOwned(e.target.value)}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4+</option></select>
            <label>How Many Other Kinds of Animals Do You Own?</label>
            <select id="othersowned" name="othersowned" value={otherOwned} onChange={(e) => setOtherOwned(e.target.value)}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4+</option></select>
            <label>Upload New Profile Picture</label>
            <input type="file" id="profilepic" onChange={handlePicUpload} name="profilepic"/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default EditProfile;