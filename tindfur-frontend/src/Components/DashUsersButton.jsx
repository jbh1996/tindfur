import './DashPetButton.css'; // reuse same styling
import { NavLink } from 'react-router-dom';
import { FaUserFriends } from "react-icons/fa"; // icon for "users"

export default function DashUsersButton() {
    return (
        <NavLink to="/view-users" className='DashPetButton'>
            <FaUserFriends className='DashIcon' />
            <p>View Users</p>
        </NavLink>
    );
}
