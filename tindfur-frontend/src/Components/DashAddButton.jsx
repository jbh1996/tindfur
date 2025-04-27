import './DashAddButton.css';
import { NavLink} from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";

export default function DashButton() {
    return (
        <NavLink to="/create-animal" className='DashAddButton'>
            <IoIosAddCircleOutline className='DashIcon' />
            <p>New Animal</p>
        </NavLink>
    )
}