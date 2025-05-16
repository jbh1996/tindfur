import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import './BrowseAnimals.css';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import AnimalBrowser from './AnimalBrowser';
import BrowsingFilter from './BrowsingFilter';
import ChatLogCardUser from './ChatLogCardUser';


export default function BrowseMessagesUser() {

  const { isLoggedIn, isShelter, userID } = userAuth();
  const navigate = useNavigate();

  const [chatLogs, setChatLogs] = useState([]);

  useEffect(() => {
    const fetchChatLogs = async () => {
      try {



        const response = await fetch(`/retrievechatlogsuser/${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch chat logs');

        const logs = await response.json();
        setChatLogs(logs)

      } catch (error) {
        console.error('Error fetching chat logs:', error);
      }
    };

    fetchChatLogs();
  }, [userID]);


  return (
    <div>
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
