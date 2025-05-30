import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import './ChatViewerShelter.css';
import userAuth from '../Hooks/UserAuth';
import InChatMessageSender from './InChatMessageSender';
import { useParams } from 'react-router-dom';
import Message from './Message';
import BackButton from './BackButton';


export default function ChatViewerShelter() {

  const { chatLogID } = useParams();

  const [messages, setMessages] = useState([])

  const { isLoggedIn, isShelter } = userAuth();


  useEffect(() => {
    const fetchMessages = async () => {
      try {

        const response = await fetch(`/retrievemessages/${chatLogID}`, {
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
        <BackButton url={'/shelter-messages'} text={'Messages'}></BackButton>
        <div  className='accountCard' id='message-card'>
          
          <section className="message-viewer">
            <div className='message-box'>
              {messages.map((message) => (
                <Message message={message} />
              ))}
            </div>
            <InChatMessageSender chatLogID={chatLogID} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
