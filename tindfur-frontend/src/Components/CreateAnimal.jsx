import './CreateAnimal.css';
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import AWS from 'aws-sdk';


// options for behavior checkboxes
const dispositionOptions = [
    { id: "1", value: "Good with Other Animals" },
    { id: "2", value: "Good with Kids" },
    { id: "3", value: "House Trained" },
    { id: "4", value: "Needs Fenced Yard" },
    { id: "5", value: "Apartment OK" },
    { id: "6", value: "Must Be on Leash" }
]

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
]

export default function CreateAnimal() {

    // state variables for form
    const [uploadPic, setUploadPic] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        animalType: "",
        breed: "",
        availability: "Available",
        gender: "",
        description: "",
    })
    const [disposition, setDisposition] = useState([])
    const [personality, setPersonality] = useState([])

    const redirect = useNavigate("")

    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value;
        setFormData((currData) => {
            currData[changedField] = newValue;
            return { ...currData };
        })
    };

    // add/remove items from disposition list
    const handleDisposition = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setDisposition([...disposition, value]);
        } else {
            const filteredList = disposition.filter((item) => item !== value);
            setDisposition(filteredList);
        };
    };

    // add/remove items from personality list
    const handlePersonality = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setPersonality([...personality, value]);
        } else {
            const filteredList = personality.filter((item) => item !== value);
            setPersonality(filteredList);
        };
    };

    // handle photo upload
    const handlePicUpload = (event) => {
        setUploadPic(event.target.files[0]);
    }
   


    //add animal to database
    const addAnimal = async (event) => {
        event.preventDefault();
        console.log(formData)

        const completeFormData = new FormData();
        completeFormData.append("name", formData.name);
        completeFormData.append("age", formData.age);
        completeFormData.append("animalType", formData.animalType);
        completeFormData.append("breed", formData.breed);
        completeFormData.append("availability", formData.availability);
        completeFormData.append("gender", formData.gender);
        completeFormData.append("description", formData.description);
        completeFormData.append("picture", uploadPic);

        for (var i = 0; i < disposition.length; i++) {
            completeFormData.append('disposition[]', disposition[i]);
        }
        for (var i = 0; i < personality.length; i++) {
            completeFormData.append('personality[]', personality[i]);
        }

        const token = localStorage.getItem("auth_token")
        const response = await fetch('/petprofiles', {
            method: 'POST',
            body: completeFormData,
            headers: {
                // 'Content-Type': 'applicaton/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 201) {
            alert('Animal profile created successfully')
        } else {
            alert(`Unable to create animal profile, status code = ${response.status}`)
        }
        redirect("/view-animals")

    }



    // redirect to login if user is logged out
    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth()
        if (!isLoggedIn) {
            redirect("/login")
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
                                    onChange={handleChange}></input>
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="age">Age</label>
                                <input
                                    id="age"
                                    type='number'
                                    name='age'
                                    value={formData.age}
                                    onChange={handleChange}>
                                </input>
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="gender">Gender</label>
                                <select
                                    id="gender"
                                    name='gender'
                                    value={formData.gender}
                                    onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </div>

                            <div className='columnPair'>
                                <label htmlFor="animal-type">Type</label>
                                <select
                                    id="animal-type"
                                    name='animalType'
                                    value={formData.animalType}
                                    onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Other">Other</option>

                                </select>
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="breed">Breed</label>
                                <input
                                    id="breed"
                                    type='text'
                                    name='breed'
                                    value={formData.breed}
                                    onChange={handleChange}>
                                </input>
                            </div>

                            <div className='columnPair'>
                                <label htmlFor="availability">Availability</label>
                                <select
                                    id="availability"
                                    name='availability'
                                    value={formData.availability}
                                    onChange={handleChange}>
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
                            <textarea placeholder='Write a description for the animal.'
                                rows="10"
                                cols="60"
                                name='description'
                                id='description'
                                onChange={handleChange}>
                            </textarea>
                            <label htmlFor='uploadPic'>Upload New Profile Picture</label>
                            <input type="file" id="uploadPic" onChange={handlePicUpload} name="uploadPic"></input>
                        </section>

                        {/* get disposition for animal  */}
                        <div className='disposition-container'>
                            <section className='behaviours'>
                                <h3>Behaviours & Needs</h3>
                                {dispositionOptions.map((item) => {
                                    return (
                                        <div key={item.id} className='checkbox-container'>
                                            <input
                                                type="checkbox"
                                                name='disposition'
                                                id={item.id}
                                                value={item.value}
                                                onChange={handleDisposition}
                                            />
                                            <label htmlFor={item.id}>{item.value}</label>
                                        </div>
                                    );
                                })}
                            </section>

                            {/* get personality for animal  */}
                            <section className='personality'>
                                <h3>Personality</h3>
                                {personalityOptions.map((item) => {
                                    return (
                                        <div key={item.id} className='checkbox-container'>
                                            <input
                                                type="checkbox"
                                                name='personality'
                                                id={item.id}
                                                value={item.value}
                                                onChange={handlePersonality}
                                            />
                                            <label htmlFor={item.id}>{item.value}</label>
                                        </div>
                                    );
                                })}
                            </section>
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </main >

            <Footer></Footer>
        </div >
    );
};
