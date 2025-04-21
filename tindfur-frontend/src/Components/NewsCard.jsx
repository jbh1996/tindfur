import './NewsCard.css';

export default function NewsCard(props) {
    return (
        <section className='NewsCard'>
            <img src={props.image} alt="" />
            <h4>{props.news}</h4>
            <p>{props.pet}</p>
        </section>
    )
}
