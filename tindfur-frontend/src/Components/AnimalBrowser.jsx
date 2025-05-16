import AnimalCard from "./AnimalCard";
import {Link}   from 'react-router-dom';

export default function AnimalBrowser({ animalList }) {


  return (
    <div>
      {animalList.map((animal) => (
        <Link key={animal._id} className='animalLink' to={`/browse-animals/${animal._id}`}>
          <AnimalCard pet={animal} />
        </Link>
      ))}
    </div>
  );
}