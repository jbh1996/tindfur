import './ViewAnimals.css';
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import ShelterFilter from './ShelterFilter';
import Animals from './Animals';
import { jwtDecode } from "jwt-decode"



export default function ViewAnimals() {
    const redirect = useNavigate("")

    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth()
        if (!isLoggedIn) {
            redirect("/login")
        }
    }, [redirect]);

    const [petList, setPetList] = useState([]);

    // get all pets for shelter
    const loadPets = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            const decodedToken = jwtDecode(token);
            const userID = decodedToken.id;

            const params = new URLSearchParams({
                animalType: '',
                breed: '',
                disposition: '',
                date: '',
                availability: '',
                createdBy: userID
            })
            const response = await fetch(`/petprofiles?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setPetList(data.profiles);
            console.log(data.profiles)

        } catch (error) {
            console.error('Error fetching pets:', error);
        };
    };

    useEffect(() => {
        loadPets();
    }, []);

    return (

        <div className="App">
            <Header />
            <main>
                <Animals pets={petList} />
            </main>
            <Footer />
        </div>
    )
}