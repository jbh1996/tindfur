import './NewsCard.css';

export default function NewsCard(props) {
    return (
        <section className='NewsCard'>
            <img src={props.image} alt="" />
            <div className='cardText'>
                <h4>{props.news}</h4>
                <p>{props.pet}</p>
            </div>
        </section>
    )
}
