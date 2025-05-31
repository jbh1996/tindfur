import './BackButton.css';
import { Link } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";


export default function BackButton({ url, text }) {
    return (
        <div className='BackButton'>
            <Link to={url} className="back-link"><IoChevronBack /> {text}</Link>
        </div>
    )
}