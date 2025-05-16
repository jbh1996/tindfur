import './AnimalCard.css';

export default function AnimalCard({pet}) {
    return (
        <section  className='AnimalCard'>
            
            {/* (PG) Changed pet.image to pet.picture */}
            <img src={pet.picture} alt="" />
            <h4>{pet.name}</h4>
            <p>{pet.animalType} | {pet.breed}</p>
        </section>
    )
}