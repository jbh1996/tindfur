import './ShelterPetProfile.css';
import Footer from './Footer';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import PetInfoUser from './PetInfoUser';
import BackButton from './BackButton';


export default function UserPetProfile() {

    const { id } = useParams()
    console.log("Pet ID from URL:", id);
    const [pet, setPet] = useState({})

    const redirect = useNavigate("")

    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth()
        if (!isLoggedIn) {
            redirect("/login")
        }
        const getProfile = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/petprofiles/${id}`);
            const profile = await response.json()
            console.log(profile)
            setPet(profile)
        }
        getProfile()
    }, [redirect, id]);

    return (
        <div className="App" id='profile-page'>
            <Header />
            <main>
                <BackButton url={'/browse-animals'} text={'All Animals'}></BackButton>
                <PetInfoUser pet={pet} />
            </main>
            <Footer />
        </div>
    )
}