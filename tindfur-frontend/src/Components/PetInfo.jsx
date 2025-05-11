import './PetInfo.css';
import BasicInfo from './BasicInfo';
import Description from './Description';
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

export default function PetInfo({ pet }) {
    return (
        <div className='PetInfo'>
            <div className='topOfProfile'>
                <img src={pet.image} alt="" />
                <div className='infoColumn'>
                    <div className='editButton'>
                    <FiEdit3 />
                    </div>
                <BasicInfo pet={pet} />
                </div>
            </div>
            <Description pet={pet} />
        </div>
    )
}