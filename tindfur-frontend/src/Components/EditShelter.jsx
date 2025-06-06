import './EditShelter.css';
import Footer from './Footer';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import AWS from 'aws-sdk';
import { jwtDecode } from 'jwt-decode';



function EditShelter() {
  const S3_BUCKET = 'tindfurpics';
  const REGION = 'us-east-2';
  const ACCESS_KEY = 'AKIAQ67UMANZD45XFBJI';
  const SECRET_ACCESS_KEY = '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';

  const { isLoggedIn, isShelter } = userAuth();
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [dogsOwned, setDogsOwned] = useState(0);
  const [catsOwned, setCatsOwned] = useState(0);
  const [otherOwned, setOtherOwned] = useState(0);
  const [uploadPic, setUploadPic] = useState(null);

  const redirect = useNavigate();

  const handlePicUpload = (event) => {
    setUploadPic(event.target.files[0]);
  };

  const uploadProfilePic = async (event) => {
    event.preventDefault();

    let profilePicUrl = '';

    if (uploadPic) {
      const s3 = new AWS.S3({
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
        region: REGION,
      });

      const params = {
        Bucket: S3_BUCKET,
        Key: uploadPic.name,
        Body: uploadPic,
        ContentType: uploadPic.type,
        ACL: 'public-read',
      };

      try {
        const response = await s3.upload(params).promise();
        profilePicUrl = response.Location;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    const token = localStorage.getItem('auth_token');
    let userID = null;

    if (token) {
      try {
        const decoded = jwtDecode(token);
        userID = decoded.id;
      } catch (err) {
        console.error('Failed to decode token', err);
      }
    }

        try {
            if (!userID || userID === "null") {
                alert("Invalid user ID — please log in again.");
                return;
            }
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    description,
                    profilePic: profilePicUrl || undefined
                }),
            });

            const data = await res.json();

      if (res.ok) {
        alert('Profile updated!');
      } else {
        alert('Update failed.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to permanently delete your account?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('auth_token');
    let userID = null;

    if (token) {
      try {
        const decoded = jwtDecode(token);
        userID = decoded.id;
      } catch (err) {
        console.error('Failed to decode token', err);
        alert('Invalid token. Please log in again.');
        return;
      }
    }

    try {
      const res = await fetch(`http://localhost:5600/user/${userID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        alert('Account deleted.');
        localStorage.removeItem('auth_token');
        redirect('/');
      } else {
        alert('Delete failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting account.');
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      redirect('/login');
    }
  }, [redirect]);

  return (
    <div className="App">
      <Header />
      <main>
        <div className="accountCard">
          <h1>Edit Profile</h1>
          <form onSubmit={uploadProfilePic}>
            <label>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Description</label>
            <textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
            
            <label>Upload New Profile Picture</label>
            <input type="file" id="profilepic" onChange={handlePicUpload} name="profilepic" />
            <button type="submit">Submit</button>
          </form>
          <div className="deleteAccountContainer">
            <button type="button" className="delete-button" onClick={handleDelete}>
              Delete Account
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EditShelter;
