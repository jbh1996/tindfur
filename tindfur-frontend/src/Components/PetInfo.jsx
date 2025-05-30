import './PetInfo.css';
import BasicInfo from './BasicInfo';
import Description from './Description';
import Overlay from './Overlay';
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function PetInfo({ pet }) {
    const redirect = useNavigate();
    const [showDialogue, setShowDialogue] = useState(false)

    //show dialogue for deleting pet
    const handleShowDialogue = () => {
        setShowDialogue(!showDialogue);
    };

    //delete pet from database
    const deletePet = async () => {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/petprofiles/${pet._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            alert('Animal profile deleted successfully');
            redirect(`/view-animals`);
        } else {
            alert(`Unable to delete animal profile, status code = ${response.status}`);
        }
    };

    return (
        <div className='PetInfo'>
            <div className='topOfProfile'>
                <div className='infoContainer'>
                    <div className='pet-image-container'>
                        <img src={pet.picture} alt="" />
                    </div>
                    <div className='infoColumn'>
                        <BasicInfo pet={pet} />
                        <Link className='bright-rectangle' key={pet._id} to={`/edit-animal/${pet._id}`}>
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bottomOfProfile'>
                <Description pet={pet} />
                <button className='black-rectangle' onClick={handleShowDialogue}>Delete</button>
            </div>

            <Overlay isOpen={showDialogue} onDelete={deletePet} onClose={handleShowDialogue} petName={pet.name} />
        </div>
    )
}