import './UserDashWelcome.css';
import { NavLink } from 'react-router-dom';
import { PiDog } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IoPawOutline } from "react-icons/io5";



export default function DashPets() {
    return (
        <div className='UserDashContainer'>
            <div className='user-dash-container'>
                <div className='user-dash-text'>
                    <h1 id='user-welcome'>Are you ready for love?</h1>
                    <p><IoPawOutline /></p>
                    <h2>Click the button below to find your soulmate.</h2>
                    <NavLink to="/browse-animals" className='solid-red-pill'>
                        Browse Pets
                    </NavLink>
                </div>
                <img src="https://images.pexels.com/photos/7210705/pexels-photo-7210705.jpeg?auto=compress&cs=tinysrgb&w=640&h=427&dpr=1" alt="" />
            </div>
        </div>
    )
}