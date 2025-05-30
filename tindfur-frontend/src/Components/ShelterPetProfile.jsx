import './ShelterPetProfile.css';
import Footer from './Footer';
import Header from './Header';
import BackButton from './BackButton';
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
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/petprofiles/${id}`, {
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


        <div className="ShelterPetProfile" id='profile-page'>
            <Header />
            <main>
                <BackButton url={'/view-animals'} text={'My Animals'}></BackButton>
                <PetInfo pet={petProfile}/>   
            </main>
            <Footer />
        </div>
    )
}