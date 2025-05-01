import './ShelterPetProfile.css';
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import PetInfo from './PetInfo';


export default function ShelterPetProfile() {
    const pet = {
        image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        type: "Dog",
        breed: "Shiba Inu",
        name: "Joey",
        age: 7,
        shelterName: "Example Animal Shelter",
        gender: "M", 
        availability: "Available",
        id: 123,
        disposition: ["Good with Other Animals", "Good with Kids", "Apartment Ok"],
        personality: ["Calm", "Cuddly"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis tortor augue. Mauris imperdiet felis nibh, nec lacinia leo sagittis id. Cras id mauris at lectus aliquam pretium luctus vitae quam. Fusce accumsan, libero quis viverra elementum, nulla nisl vehicula lectus, quis placerat enim dolor in sapien. Vivamus dignissim scelerisque odio, eu convallis quam consectetur quis. Pellentesque euismod tellus lectus, vel ullamcorper tortor dignissim quis. Maecenas pellentesque lectus in bibendum viverra. Nunc sodales sollicitudin orci ac euismod. Donec volutpat lacus vitae orci ullamcorper, et scelerisque leo posuere. Donec eu urna leo. Praesent luctus lectus vel mauris venenatis, accumsan tincidunt ex ornare.",
    }

    const redirect = useNavigate("")

    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth()
        if (!isLoggedIn) {
            redirect("/login")
        }
    }, [redirect]);

    return (


        <div className="App" id='profile-page'>
            <Header />
            <main>
                <PetInfo pet={pet}/>
            </main>
            <Footer />
        </div>
    )
}