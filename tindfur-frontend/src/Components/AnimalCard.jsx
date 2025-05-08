import './AnimalCard.css';
import { useNavigate } from 'react-router-dom';

export default function AnimalCard({pet}) {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/browse-animals/${pet._id}`);
    };

    return (
        <section onClick={handleClick} className='AnimalCard'>
            <img src={pet.image} alt="" />
            <h4>{pet.name}</h4>
            <p>{pet.species} | {pet.breed}</p>
        </section>
    )
}