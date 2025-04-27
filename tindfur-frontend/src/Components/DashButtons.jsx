import './DashButtons.css';
import DashPetButton from './DashPetButton'
import DashAddButton from './DashAddButton'


export default function DashButtons() {
    return (
        <div className='DashButtons'>
            <div className='dashButtonsText'> 
                <h1>My Animals</h1>
                <p>Manage the animal profiles for your shelter</p>
            </div>
            <DashPetButton />
            <DashAddButton />
        </div>
    )
}
