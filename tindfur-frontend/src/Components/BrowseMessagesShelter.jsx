import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import './BrowseAnimals.css';
import userAuth from '../Hooks/UserAuth';
import ChatLogCardUser from './ChatLogCardUser';


export default function BrowseMessagesShelter() {

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
        <section className="browser">
        {chatLogs.map((log) => (
            <ChatLogCardUser chatLog={log} />
          ))}        
        </section>
      </main>
      <Footer />
    </div>
  );
}
