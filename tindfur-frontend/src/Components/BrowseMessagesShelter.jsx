import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import './BrowseAnimals.css';
import userAuth from '../Hooks/UserAuth';
import ChatLogCardUser from './ChatLogCardUser';
import { useNavigate } from 'react-router-dom';



export default function BrowseMessagesShelter() {
   const redirect = useNavigate("")
  // Restrict access to Shelter users only
  useEffect(() => {
    const auth = userAuth();
    console.log('userAuth:', auth);

    const { isLoggedIn, isShelter } = userAuth();
    if (!isLoggedIn) {
      redirect("/login");
    } else if (!isShelter) {
      alert("Restricted Access: Not Allowed");
      redirect("/");
    }
  }, [redirect]);

  const { isLoggedIn, isShelter, userID } = userAuth();
  const [chatLogs, setChatLogs] = useState([]);


  useEffect(() => {
    const fetchChatLogs = async () => {
      try {



        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/retrievechatlogsshelter/${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch chat logs');

        const logs = await response.json();
        
        const filteredLogs = logs.filter(log => log.petID !== null && log.petID !== undefined && log.userID !== null && log.userID !== undefined);

        setChatLogs(filteredLogs)

      } catch (error) {
        console.error('Error fetching chat logs:', error);
      }
    };

    fetchChatLogs();
  }, [userID]);


  return (
    <div className='App'>
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
        <div id='view-header-container'>
          <h1 className='view-header'>Messages</h1>
        </div>
        <section className="browser">

        {chatLogs.length === 0 ? (
          
          <p>No Messages to Display</p>) : (

        chatLogs.map((log) => (
            <ChatLogCardUser chatLog={log} />
          )))}        
        </section>
      </main>
      <Footer />
    </div>
  );
}
