import './ShelterPetProfile.css';
import Footer from './Footer';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import PetInfoUser from './PetInfoUser';
import UserMessageSender from './UserMessageSender';


export default function UserPetProfile() {

    const {id} = useParams()
    console.log("Pet ID from URL:", id);
    const [pet, setPet] = useState({})
    

    const redirect = useNavigate("")

    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth()
        if (!isLoggedIn) {
            redirect("/login")
        }
        const getProfile = async () => {
            const response = await fetch(`/petprofiles/${id}`);
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
            <PetInfoUser pet={pet}/>
            <UserMessageSender pet={pet} />
            </main>
            <Footer />
        </div>
    )
}