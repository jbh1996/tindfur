import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import './BrowseAnimals.css';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import AnimalBrowser from './AnimalBrowser';
import BrowsingFilter from './BrowsingFilter';

function BrowseAnimals() {
  const { isLoggedIn, isShelter } = userAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    animalType: '',
    breed: '',
    disposition: [],
    createdAt: '',
    availability: '',
    createdBy: '',
  });

  const [animalList, setAnimalList] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const params = new URLSearchParams({
          animalType: filters.animalType,
          breed: filters.breed,
          disposition: filters.disposition.join(','),
          createdAt: filters.createdAt,
          availability: filters.availability,
          createdBy: filters.createdBy,
        });

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/petprofiles?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch pets');

        const pets = await response.json();
        setAnimalList(pets.profiles); 
        console.log(pets.profiles)

      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, [filters]);

  // Update filters when BrowsingFilter submits the form
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} isShelter={isShelter} />
      <main>
        <section className="browser">
          <BrowsingFilter onSubmit={handleFilterChange} />
          <div className='animal-grid'>
          <AnimalBrowser animalList={animalList} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default BrowseAnimals;