import './Animals.css';
import AnimalLink from './AnimalLink';

export default function Animals({ pets }) {
    return (
        <div className='Animals'>
            {/* {pets.map((pet) => (
                <AnimalLink key={pet.id} pet={pet} />
            ))} */}
            <AnimalLink pet={pets} />
            <AnimalLink pet={pets} />
            <AnimalLink pet={pets} />

        </div>
    )
}