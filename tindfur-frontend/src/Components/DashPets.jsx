import './DashPets.css';
import { NavLink} from 'react-router-dom';
import { PiDog } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";


export default function DashPets() {
    return (
        <div className='DashPets'>

            <div className='dash-container'>
                <div className='dash-text'>
                    <h1>My Animals</h1>
                    <p>Manage the animal profiles for your shelter</p>
                </div>
                <div className='dash-buttons'>
                <NavLink to="/view-animals" className='dash-outline-button'>
                    <PiDog className='DashIcon' />
                    <p>View All </p>
                </NavLink>
                
                <NavLink to="/create-animal" className='dash-solid-button'>
                    <IoIosAddCircleOutline className='DashIcon' />
                    <p>New Animal</p>
                </NavLink>
                </div>
            </div>
        </div>
    )
}