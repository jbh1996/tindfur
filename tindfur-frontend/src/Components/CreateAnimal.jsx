import './CreateAnimal.css';
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';

// options for behavior checkboxes
const dispositionOptions = [
    { id: "1", value: "Good with Other Animals" },
    { id: "2", value: "Good with Kids" },
    { id: "3", value: "House Trained" },
    { id: "4", value: "Needs Fenced Yard" },
    { id: "5", value: "Apartment OK" },
    { id: "6", value: "Must Be on Leash" }
];

// options for personality checkboxes
const personalityOptions = [
    { id: "1", value: "Cuddly" },
    { id: "2", value: "Active" },
    { id: "3", value: "Calm" },
    { id: "4", value: "Smart" },
    { id: "5", value: "Friendly" },
    { id: "6", value: "Obedient" },
    { id: "7", value: "Gentle" },
    { id: "8", value: "Shy" }
];

export default function CreateAnimal() {

    // state variables for form
    const [picture, setPicture] = useState(null);
    const [animalType, setAnimalType] = useState('');
    const [breed, setBreed] = useState('');
    const [breeds, setBreeds] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        availability: "Available",
        gender: "",
        description: "",
    });
    const [disposition, setDisposition] = useState([]);
    const [personality, setPersonality] = useState([]);

    const redirect = useNavigate();

    // Get breed list for dropdown
    useEffect(() => {
        const fetchBreeds = async (type) => {
            if (!type) {
                setBreeds([]);
                setBreed('');
                return;
            }
            const res = await fetch(`/breeds/${type}`);
            const data = await res.json();
            setBreeds(data);
            setBreed('');
        };

        fetchBreeds(animalType);
    }, [animalType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(currData => ({
            ...currData,
            [name]: value
        }));
    };

    // add/remove items from disposition list
    const handleDisposition = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setDisposition(prev => [...prev, value]);
        } else {
            setDisposition(prev => prev.filter(item => item !== value));
        }
    };

    // add/remove items from personality list
    const handlePersonality = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setPersonality(prev => [...prev, value]);
        } else {
            setPersonality(prev => prev.filter(item => item !== value));
        }
    };
    // handle photo upload
    const handlePicUpload = (e) => {
        setPicture(e.target.files[0]);
    };

    //add animal to database
    const addAnimal = async (e) => {
        e.preventDefault();

        const completeFormData = new FormData();
        completeFormData.append("name", formData.name);
        completeFormData.append("age", formData.age);
        completeFormData.append("animalType", animalType);
        completeFormData.append("breed", breed);
        completeFormData.append("availability", formData.availability);
        completeFormData.append("gender", formData.gender);
        completeFormData.append("description", formData.description);

        if (picture) {
            completeFormData.append("petpic", picture);
        }

        disposition.forEach(item => completeFormData.append('disposition[]', item));
        personality.forEach(item => completeFormData.append('personality[]', item));

        const token = localStorage.getItem("auth_token");
        const response = await fetch('/petprofiles', {
            method: 'POST',
            body: completeFormData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 201) {
            alert('Animal profile created successfully');
            redirect("/view-animals");
        } else {
            alert(`Unable to create animal profile, status code = ${response.status}`);
        }
    };

    // Restrict access to create profile to Shelter users only
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


    return (
        <div className="App">
            <Header />
            <main>
                <div className='CreateAnimal'>
                    <h1>Create Animal Profile</h1>
                    <form onSubmit={addAnimal}>
                        {/* get basic info for animal */}
                        <h3>Animal's Information</h3>
                        <section className='info'>
                            <div className='columnPair'>
                                <label htmlFor="name">Name</label>
                                <input
                                    id='name'
                                    type="text"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="age">Age</label>
                                <input
                                    id="age"
                                    type='number'
                                    name='age'
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="gender">Gender</label>
                                <select
                                    id="gender"
                                    name='gender'
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value=""></option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="animal-type">Type</label>
                                <select
                                    id="animal-type"
                                    name="animalType"
                                    value={animalType}
                                    onChange={(e) => setAnimalType(e.target.value)}
                                >
                                    <option value=""></option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="breed">Breed</label>
                                <select
                                    value={breed}
                                    onChange={(e) => setBreed(e.target.value)}
                                    required
                                >
                                    <option value="">Select Breed</option>
                                    {breeds.length > 0 ? (
                                        breeds.map((b) => (
                                            <option key={b} value={b}>{b}</option>
                                        ))
                                    ) : (
                                        <option value="other">Other</option>
                                    )}
                                </select>
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="availability">Availability</label>
                                <select
                                    id="availability"
                                    name='availability'
                                    value={formData.availability}
                                    onChange={handleChange}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Not Available">Not Available</option>
                                    <option value="Adopted">Adopted</option>
                                </select>
                            </div>
                        </section>

                        {/* get description and photo for animal  */}
                        <h3>About</h3>
                        <section className='about'>
                            <textarea
                                placeholder='Write a description for the animal.'
                                rows="10"
                                cols="60"
                                name='description'
                                id='description'
                                value={formData.description}
                                onChange={handleChange}
                            />
                            <label htmlFor='uploadPic'>Upload New Profile Picture</label>
                            <input
                                type="file"
                                id="uploadPic"
                                name="petpic"
                                accept="image/*"
                                onChange={handlePicUpload}
                            />
                        </section>

                        {/* get disposition for animal  */}
                        <div className='disposition-container'>
                            <section className='behaviours'>
                                <h3>Behaviours & Needs</h3>
                                <div className='checkboxes'>
                                {dispositionOptions.map((item) => (
                                    <div key={item.id} className='checkbox-container'>
                                        <input
                                            type="checkbox"
                                            name='disposition'
                                            id={item.id}
                                            value={item.value}
                                            checked={disposition.includes(item.value)}
                                            onChange={handleDisposition}
                                        />
                                        <label htmlFor={item.id}>{item.value}</label>
                                    </div>
                                ))}
                                </div>
                            </section>

                            {/* get personality for animal  */}
                            <section className='personality-container'>
                                <h3>Personality</h3>
                                <div className='checkboxes'>
                                    {personalityOptions.map((item) => (
                                        <div key={item.id} className='checkbox-container'>
                                            <input
                                                type="checkbox"
                                                name='personality'
                                                id={item.id}
                                                value={item.value}
                                                checked={personality.includes(item.value)}
                                                onChange={handlePersonality}
                                            />
                                            <label htmlFor={item.id}>{item.value}</label>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};
