import './AnimalBrowser.css';
import AnimalCard from './AnimalCard';
import testpets from '../temporarydata/testpets';


export default function AnimalBrowser() {
    return (
        <section className='AnimalBrowser'>
        {testpets.map((pet) =>         
        <AnimalCard pet={pet}/>
        )}
        </section>
    )
}
