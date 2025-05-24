import AnimalCard from "./AnimalCard";
import { Link } from 'react-router-dom';

export default function AnimalBrowser({ animalList }) {
  return (
    <div>
      {animalList.map((animal) => {
        const animalId = animal._id?.$oid || animal._id;

        return (
          <Link key={animalId} to={`/browse-animals/${animalId}`} className="animalLink">
          <AnimalCard pet={animal} />
          </Link>
        );
      })}
    </div>
  );
}
