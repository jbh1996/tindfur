import './NewsCard.css';

export default function NewsCard(props) {
    return (
        <section className='NewsCard'>
            <img src={props.image} alt="Animal" />
            <p><strong>Name:</strong> {props.pet}</p>
            <p><strong>Breed:</strong> {props.breed}</p>
            <p><strong>Availability:</strong> {props.availability}</p>
        </section>
    )
}