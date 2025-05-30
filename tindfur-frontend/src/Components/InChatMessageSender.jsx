import './CreateAnimal.css';
import { useState } from 'react';
import userAuth from '../Hooks/UserAuth';
import { useNavigate } from 'react-router-dom';



export default function InChatMessageSender({chatLogID}) {

    const [content, setContent] = useState("");

    const {isLoggedIn, isShelter, userID} = userAuth()

    const userType = isShelter ? "shelter" : "user";

    const navigate = useNavigate()



    const sendMessage = async (event) => {
        event.preventDefault();
      


        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/createmessageinchat`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                content,
                userType,
                chatLogID,
              })
            });
          
            if (response.ok) {
              alert("Message sent successfully");
              navigate(0);
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
                        <section className='message'>
                            <textarea placeholder='' value={content} rows="10" cols="60" onChange={(e) => setContent(e.target.value)}></textarea>
                        </section>
                        <button type="submit">Submit</button>
                    </form>


    );
};
