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
    { id: "5", value: "Apartment Ok" },
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
    { id: "7", value: "Gentle" }
]

export default function CreateAnimal() {
    // constants for photo upload
    const S3_BUCKET = 'tindfurpics'
    const REGION = 'us-east-2'
    const ACCESS_KEY = 'AKIAQ67UMANZD45XFBJI';
    const SECRET_ACCESS_KEY = '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';

    // state variables for form
    const [uploadPic, setUploadPic] = useState(null);
    const [formData, setFormData] = useState({
        petName: "",
        age: "",
        shelter: "",
        petType: "",
        breed: "",
        availability: "",
        gender: "",
        activityLevel: "",
        trainingLevel: "",
        housing: "",
        disposition: [],
        personality: []
    })

    // handle change to form input
    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value;

        if (changedField === "disposition" || changedField === "personality") {
            const isChecked = e.target.checked;
            if (isChecked) {
                setFormData((currData) => {
                    currData[changedField] = [...currData[changedField], newValue];
                    return { ...currData };
                })
            } else {
                setFormData((currData) => {
                    const filteredList = currData[changedField].filter((item) => item !== newValue);
                    currData[changedField] = filteredList;
                    return { ...currData };
                })
            };
        }

        setFormData((currData) => {
            currData[changedField] = newValue;
            return { ...currData };
        })
    };


    // handle photo upload
    const handlePicUpload = (event) => {
        setUploadPic(event.target.files[0]);
    }
    const UploadForm = (event) => {
        setUploadPic(event.target.files[0]);
    }
    const uploadProfilePic = async (event) => {
        event.preventDefault();

        if (uploadPic) {

            const s3 = new AWS.S3({
                accessKeyId: ACCESS_KEY,
                secretAccessKey: SECRET_ACCESS_KEY,
                region: REGION,
            });

            const params = {
                Bucket: S3_BUCKET, // Replace with your bucket name
                Key: uploadPic.name,
                Body: uploadPic,
                ContentType: uploadPic.type,
                ACL: 'public-read', // Makes the uploaded image publicly accessible
            }
            try {
                const response = await s3.upload(params).promise();
                console.log('Image uploaded successfully:', response.Location);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    }

    // redirect to login if user is logged out
    const redirect = useNavigate("")

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
                    <form onSubmit={uploadProfilePic}>
                        {/* get basic info for animal */}
                        <h3>Animal's Information</h3>
                        <section className='info'>
                            <div className='columnPair'>
                                <label htmlFor="petName">Name</label>
                                <input
                                    id='petName'
                                    type="text"
                                    name='petName'
                                    value={formData.petName}
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
                                <label htmlFor="pet-type">Type</label>
                                <select
                                    id="pet-type"
                                    name='petType'
                                    value={formData.petType}
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
                                <label htmlFor="shelter">Shelter Name</label>
                                <input
                                    id="shelter"
                                    type='text'
                                    name='shelter'
                                    value={formData.shelter}
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
                            <textarea placeholder='Write a description for the animal.' rows="10" cols="60"></textarea>
                            <label>Upload New Profile Picture</label>
                            <input type="file" id="profilepic" onChange={handlePicUpload} name="profilepic"></input>
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
                                                onChange={handleChange}
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
                                                onChange={handleChange}
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
