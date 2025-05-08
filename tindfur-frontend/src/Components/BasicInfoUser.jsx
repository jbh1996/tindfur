import './BasicInfo.css';

export default function BasicInfoUser({ pet }) {
    return (
        <div className='BasicInfo'>
            <h2>{pet.name}</h2>
            <img src={pet.image} height="500" width="500" alt="" />
            <ul>
                <li><span>Type:</span> {pet.animalType}</li>
                <li><span>Breed:</span> {pet.breed}</li>
                <li><span>Status:</span> {pet.availability}</li>
            </ul>
        </div>

    )
}