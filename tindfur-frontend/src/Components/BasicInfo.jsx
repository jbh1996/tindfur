import './BasicInfo.css';

export default function BasicInfo({ pet }) {
    return (
        <div className='BasicInfo'>
            <h2>{pet.name}</h2>
            <ul>
                <li><span>Type:</span> {pet.type}</li>
                <li><span>Breed:</span> {pet.breed}</li>
                <li><span>Age:</span> {pet.age}</li>
                <li><span>Gender:</span> {pet.gender}</li>
                <li><span>Shelter:</span> {pet.shelterName}</li>
                <br />
                <li><span>Status:</span> {pet.availability}</li>
            </ul>
        </div>

    )
}