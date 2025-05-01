import './Animals.css';
import AnimalLink from './AnimalLink';

export default function Animals({petInfo}){
    return (
        <div className='Animals'>
        <AnimalLink pet={petInfo}/>
        <AnimalLink pet={petInfo}/>
        <AnimalLink pet={petInfo}/>

        </div>
    )
}