import './PetInfo.css';
import BasicInfo from './BasicInfo';
import Description from './Description';
import Overlay from './Overlay';
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import UserMessageSender from './UserMessageSender';


export default function PetInfoUser({ pet }) {
    const redirect = useNavigate();

    return (
        <div className='PetInfo'>
            <div className='topOfProfile'>
                <div className='infoContainer'>
                    <div className='pet-image-container'>
                    <img src={pet.picture} alt="" />
                    </div>
                    <div className='infoColumn'>
                        <BasicInfo pet={pet} />
                        <a href="#profile-messages" className='bright-rectangle'>Message Shelter</a>
                    </div>
                </div>
            </div>
            <div id='user-bottom-profile' className='bottomOfProfile'>
                <Description pet={pet} />   
            </div>
        <section id='profile-messages'>
        <UserMessageSender  pet={pet} />
        </section>
        </div>
    )
}