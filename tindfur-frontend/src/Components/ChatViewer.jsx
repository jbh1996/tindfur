import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import './ChatViewer.css';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import AnimalBrowser from './AnimalBrowser';
import BrowsingFilter from './BrowsingFilter';
import InChatMessageSender from './InChatMessageSender';
import { useParams } from 'react-router-dom';
import Message from './Message';

export default function ChatViewer() {

    const {chatLogID} = useParams();

    const [messages, setMessages] = useState([])

  const { isLoggedIn, isShelter } = userAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    animalType: '',
    breed: '',
    dispositions: [],
    date: '',
    availability: 'Available',
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/retrievemessages/${chatLogID}`        , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch messages');

        const messages = await response.json();
        setMessages(messages); 
        console.log(messages);

      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);


  return (
    <div>
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
        <section className="message-viewer user-viewer">
            <div className='message-box'>
            {messages.map((message) => (
        <Message message={message} />
      ))}
          </div>
          <InChatMessageSender chatLogID={chatLogID} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
