import './ShelterPetProfile.css';
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import PetInfo from './PetInfo';


export default function ShelterPetProfile(props) {

    const redirect = useNavigate("")

    const { id } = useParams();

    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth()
        if (!isLoggedIn) {
            redirect("/login")
        }
    }, [redirect]);

    const [petProfile, setPetProfile] = useState({});

    const loadPet = async () => {
        try {
        const response = await fetch(`/petprofiles/${id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setPetProfile(data);
        console.log(data)

        } catch (error){
            console.error('Error fetching pet:', error);
        };
    };

    useEffect(() => {
        loadPet();
    }, []);

    return (


        <div className="App" id='profile-page'>
            <Header />
            <main>
                <PetInfo pet={petProfile}/>
            </main>
            <Footer />
        </div>
    )
}