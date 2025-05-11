import './ViewAnimals.css';
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import ShelterFilter from './ShelterFilter';
import Animals from './Animals';


const petInfo = {
    image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    species: "Dog",
    breed: "Shiba Inu",
    name: "Joey",
    age: 7,
    id: 123
}



export default function ViewAnimals() {
    const redirect = useNavigate("")

    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth()
        if (!isLoggedIn) {
            redirect("/login")
        }
    }, [redirect]);

    const [pets, setPets] = useState([]);

    const loadPets = async () => {
        const response = await fetch('/petprofiles');
        const data = await response.json();
        setPets(data);
    }

    return (


        <div className="App">
            <Header />
            <main>
                <Animals pets={petInfo} />
            </main>
            <Footer />
        </div>
    )
}