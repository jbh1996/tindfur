import './DashPetButton.css';
import { NavLink} from 'react-router-dom';
import { PiDog } from "react-icons/pi";




export default function DashButton({ title, Icon }) {
    return (
        <NavLink to="/view-animals" className='DashPetButton'>
            <PiDog className='DashIcon'/>
            <p>View All </p>
        </NavLink>


    )
}