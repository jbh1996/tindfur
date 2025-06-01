import './AnimalCard.css';

export default function AnimalCard({ pet }) {
    return (
        <section className='AnimalCard'>

            {/* (PG) Changed pet.image to pet.picture */}

            <img src={pet.picture} alt="" />
            <div className='animal-card-text'>
                <div className='description-text'>
                    <h4>{pet.name}</h4>
                    <p>{pet.animalType} | {pet.breed}</p>
                </div>
                <p id='availability-tag'>{pet.availability}</p>
            </div>

        </section>
    )
}