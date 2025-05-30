import './Newsfeed.css';
import NewsCard from './NewsCard';
import { useState, useEffect } from 'react';

export default function Newsfeed() {
  const [newsFeed, setNewsFeed] = useState([]);
  
  useEffect(() => {

    // Get news feed data from backend
    const getNewsFeed = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/newsfeed`);

        if (!response.ok) {
          throw new Error('Unable to get news feed');
        }
        const data = await response.json();

        setNewsFeed(data); 

      } catch (error) {
        console.error("Error getting news feed", error);
      }
    };
    getNewsFeed();
  }, []);
  
  return (
    <div className='Newsfeed'>
      {newsFeed.length === 0 ? (

        <p>Stay Tuned!New Updates Coming Soon!</p>

      ) : (
        newsFeed.map((item) => (
          <NewsCard
            key={item._id}
            pet={item.petId ? item.petId.name : 'Name Not Provided'}  
            image={item.picture}
            news={item.news}
            breed={item.petId ? item.petId.breed : 'Breed Not Listed'}  
            availability={item.petId ? item.petId.availability : 'Status Unavailable'} 
          />
        ))
      )}
    </div>
  );
}
