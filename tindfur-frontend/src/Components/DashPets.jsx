import './DashPets.css';
import { NavLink } from 'react-router-dom';
import { PiDog } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa"; 


export default function DashPets() {
    return (
        <div className='DashPets'>

            <div className='dash-container'>
                <div className='dash-text'>
                    <h1>Manage Profiles</h1>
                    <p>Manage the animal profiles for your shelter or view potential adoptees</p>
                </div>
                <div className='dash-buttons'>
                    <NavLink to="/view-users" className='dash-outline-button'>
                        <FaUserFriends className='DashIcon' />
                        <p>View Users</p>
                    </NavLink>
                    <NavLink to="/view-animals" className='dash-outline-button'>
                        <PiDog className='DashIcon' />
                        <p>My Animals</p>
                    </NavLink>

                    <NavLink to="/create-animal" className='dash-outline-button'>
                        <IoIosAddCircleOutline className='DashIcon' />
                        <p>New Animal</p>
                    </NavLink>

                    
                </div>
            </div>
        </div>
    )
}