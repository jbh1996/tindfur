import './DashButtons.css';
import DashPetButton from './DashPetButton';
import DashAddButton from './DashAddButton';
import DashUsersButton from './DashUsersButton'; // 👈 new import

export default function DashButtons() {
    return (
        <div className='DashButtons'>
            <div className='dashButtonsText'>
                <h1>Manage Profiles</h1>
                <p>Manage the animal profiles for your shelter</p>
                <p>View potential adoptees</p>
            </div>
            <DashPetButton />
            <DashAddButton />
            <DashUsersButton /> {/* 👈 add this here */}
        </div>
    );
}

