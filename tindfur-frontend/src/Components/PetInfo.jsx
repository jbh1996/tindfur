import './PetInfo.css';
import BasicInfo from './BasicInfo';
import Description from './Description';

export default function PetInfo({ pet }) {
    return (
        <div className='PetInfo'>
            <div className='topOfProfile'>
                <img src={pet.image} alt="" />
                <BasicInfo pet={pet} />
            </div>
            <Description pet={pet} />
        </div>
    )
}