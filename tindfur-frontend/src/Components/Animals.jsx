import './Animals.css';
import AnimalCard from './AnimalCard';
import {Link}   from 'react-router-dom';

export default function Animals({ pets }) {
    return (
        <div className='Animals'>
            {pets.map((pet) => (
                <Link key={pet._id} className='animalLink' to={`/view-animals/${pet._id}`}>
                    <AnimalCard pet={pet} /> 
                </Link>
            ))}

        </div>
    )
}