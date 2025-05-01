import './ShelterPetProfile.css';
import Footer from './Footer';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import PetInfo from './PetInfo';
import BasicInfoUser from './BasicInfoUser';


export default function UserPetProfile() {

    const {id} = useParams()
    console.log("Pet ID from URL:", id);
    const [pet, setPet] = useState({
        "_id": { "$oid": "663209001234567890abcdef" },
        "name": "Buddy",
        "animalType": "dog",
        "breed": "Labrador Retriever",
        "disposition": ["Good with children", "Good with other animals"],
        "availability": "Available",
        "picture": "https://example.com/images/lab.jpg",
        "description": "Friendly and energetic Labrador who loves to play fetch.",
        "news": "Recently vaccinated and ready for adoption!",
        "createdBy": { "$oid": "663100001111111111111111" },
        "date": { "$date": "2024-11-10T00:00:00.000Z" }
      }
      )
    

    const redirect = useNavigate("")

    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth()
        if (!isLoggedIn) {
            redirect("/login")
        }
        const getProfile = async () => {
            const response = await fetch(`/petprofiles/${id}`);
            const profile = await response.json()
            setPet(profile)
        }
        getProfile()
    }, [redirect, id]);

    return (


        <div className="App" id='profile-page'>
            <Header />
            <main>
            <BasicInfoUser pet={pet}/>
            
            </main>
            <Footer />
        </div>
    )
}