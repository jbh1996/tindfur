import './EditProfile.css';
import { useState } from 'react';
import userAuth from '../Hooks/UserAuth';



export default function UserMessageSender({pet}) {

    const [content, setContent] = useState("");

    const {isLoggedIn, isShelter, userID} = userAuth()


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
            const response = await fetch('/createmessage', {
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
          }}



    return (

                    <form onSubmit={sendMessage}>
                        <h3>Send Them A Message!</h3>
                        <section className='message'>
                            <textarea placeholder='' value={content} rows="10" cols="60" onChange={(e) => setContent(e.target.value)}></textarea>
                        </section>
                        <button type="submit">Submit</button>
                    </form>


    );
};
