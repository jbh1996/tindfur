import './EditAnimal.css';
import Footer from './Footer';
import Header from './Header';
import BackButton from './BackButton';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import EditAnimalForm from './EditAnimalForm';



export default function EditAnimal() {
    const redirect = useNavigate("")
    const { id } = useParams();
    const [petProfile, setPetProfile] = useState({});

    // verify that user is logged in
    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth()
        if (!isLoggedIn) {
            redirect("/login")
        } else if (!isShelter) {
            alert("Restricted Access: Not Allowed");
            redirect("/");
        }
    }, [redirect]);

    // load current pet info
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
        console.log(data);
        
        } catch (error){
            console.error('Error fetching pet:', error);
        };
    };

    useEffect(() => {
        loadPet();
    }, []);





    return (
        <div className="App">
            <Header />
            <main>
                <BackButton url={`/view-animals/${petProfile._id}`} text={petProfile.name}></BackButton>
                <EditAnimalForm pet={petProfile} />
            </main>
            <Footer />
        </div>
    )
}