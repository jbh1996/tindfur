import './Description.css';


export default function PetInfo({ pet }) {


    return (
        <div className='Description'>
            <div className='traits'>

                <div className='disposition'>
                    <h3>Behaviors & Needs</h3>
                    <ul>
                        {pet.disposition && pet.disposition.map(trait => <li>{trait}</li>)}
                    </ul>
                </div>
                <div className='personality'>
                    <h3>Personality</h3>
                    <ul>
                        {pet.personality && pet.personality.map(trait => <li>{trait}</li>)}
                    </ul>
                </div>

            </div>
            <div className='about'>
                <h3>About</h3>
                <p>{pet.description}</p>
            </div>
        </div>
    )
}