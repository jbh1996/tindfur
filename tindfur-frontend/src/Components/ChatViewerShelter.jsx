import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import './ChatViewerShelter.css';
import userAuth from '../Hooks/UserAuth';
import InChatMessageSender from './InChatMessageSender';
import { useParams } from 'react-router-dom';
import Message from './Message';

export default function ChatViewerShelter() {
  const {chatLogID} = useParams();

  const [messages, setMessages] = useState([])

  const [pet, setPet]  = useState({})
  const [user, setUser] =  useState({})

const { isLoggedIn, isShelter } = userAuth();

const [filters, setFilters] = useState({
  animalType: '',
  breed: '',
  dispositions: [],
  date: '',
  availability: 'Available',
});

useEffect(() => {

  const fetchChatLogInfo = async () => {
    try {
      const chatlog_response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chatlog/${chatLogID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!chatlog_response.ok) throw new Error('Failed to fetch chat log info');

      const info = await chatlog_response.json();

      setUser(info.userID)
      setPet(info.petID)

    } catch (error) {
      console.error('Error fetching chat log info:', error);
    }
  };


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

  fetchChatLogInfo();
  fetchMessages();
}, []);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
        <section className="message-viewer">
        <p><strong>From:</strong> {user.username}</p>
        <p><strong>Concerning:</strong> {pet.name}</p>
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
