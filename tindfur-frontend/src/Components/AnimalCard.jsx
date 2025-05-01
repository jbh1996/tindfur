import './AnimalCard.css';

export default function AnimalCard({pet}) {
    return (
        <section className='AnimalCard'>
            <img src={pet.image} alt="" />
            <h4>{pet.name}</h4>
            <p>{pet.species} | {pet.breed}</p>
        </section>
    )
}