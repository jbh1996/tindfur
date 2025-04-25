import './NewsCard.css';

export default function AnimalCard({pet}) {
    return (
        <section className='NewsCard'>
            <img src={pet.image} alt="" />
            <h4>{pet.name}</h4>
            <p>{pet.species}</p>
        </section>
    )
}