import './News.css';
import Newsfeed from './Newsfeed';
import NewsHeader from './NewsHeader';


export default function News() {
    return (
        <section className='News'>
            <NewsHeader />
            <Newsfeed />
        </section>
    )
}
