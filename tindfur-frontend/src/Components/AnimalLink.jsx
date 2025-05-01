import './AnimalLink.css';
import AnimalCard from './AnimalCard';
import {Link}   from 'react-router-dom';

export default function AnimalLink({pet}) {
    return (
        <Link className='AnimalLink' to={`/view-animals/${pet.id}`}>
            <AnimalCard pet={pet} /> 
        </Link>
    )
}