import './ViewAnimals.css';
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import Animals from './Animals';
import { jwtDecode } from "jwt-decode"
import { NavLink } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";





export default function ViewAnimals() {
    const redirect = useNavigate("")

    // Restrict access to Shelter users only
    useEffect(() => {
        const auth = userAuth();
        console.log('userAuth:', auth);

        const { isLoggedIn, isShelter } = userAuth();
        if (!isLoggedIn) {
            redirect("/login");
        } else if (!isShelter) {
            alert("Restricted Access: Not Allowed");
            redirect("/");
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
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/petprofiles?${params.toString()}`, {
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
                <div className='view-container'>
                    <div className='view-header-container'>
                        <h1 className='view-header'>My Animals</h1>
                        <NavLink id='add' to="/create-animal"><IoIosAddCircleOutline /> </NavLink>
                    </div>
                    <Animals pets={petList} />
                </div>
            </main>
            <Footer />
        </div>
    )
}