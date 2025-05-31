import './UserMessageSender.css';
import { useState } from 'react';
import userAuth from '../Hooks/UserAuth';



export default function UserMessageSender({ pet }) {
  const [content, setContent] = useState("");
  const { isLoggedIn, isShelter, userID } = userAuth()

  const sendMessage = async (event) => {
    event.preventDefault();

    console.log(userID, pet.createdBy, pet._id)

    console.log({
      content,
      userRole: "user",
      userID,
      shelterID: pet.createdBy,
      petID: pet._id
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/createmessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content,
          userType: "user",
          userID,
          shelterID: pet.createdBy,
          petID: pet._id
        })
      });

      if (response.ok) {
        alert("Message sent successfully");
        setContent("");
      } else {
        const data = await response.json();
        alert("Failed to send message: " + data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred.");
    }
  }



  return (
  
    <form className='UserMessageSender' onSubmit={sendMessage}>
      <h1>Interested in {pet.name}?</h1>
      <h3>If you are interested in adopting {pet.name} or have any questions, message the shelter below:</h3>
      <section className='message'>
        <textarea placeholder='Write a message to the shelter.' value={content} rows="10" cols="60" onChange={(e) => setContent(e.target.value)}></textarea>
      </section>
      <button id='profile-message-button' className='black-rectangle' type="submit">Submit</button>
    </form>


  );
};
