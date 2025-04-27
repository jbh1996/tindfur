import './CreateAnimal.css';
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import AWS from 'aws-sdk';

export default function CreateAnimal() {
    const S3_BUCKET = 'tindfurpics'
    const REGION = 'us-east-2'
    const ACCESS_KEY = 'AKIAQ67UMANZD45XFBJI';
    const SECRET_ACCESS_KEY = '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';

    const [uploadPic, setUploadPic] = useState(null);
    const [formData, setFormData] = useState({
        petName: "",
        age: "",
        location: "",
        shelter: "",
        petType: "",
        breed: "",
        petSize: "",
        gender: "",
        activityLevel: "",
        trainingLevel: "",
        housing: "",
    })

    const [formCheckboxes, setFormCheckboxes] = useState({
        isHouseTrained: false,
        isGoodWithAnimals: false,
        isGoodWithKids: false,
        isCuddly: false
    })


    const redirect = useNavigate("")


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


    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth()
        if (!isLoggedIn) {
            redirect("/login")
        }
    }, [redirect]);


    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value;
        setFormData((currData) => {
            currData[changedField] = newValue;
            return { ...currData };
        })
    };
    const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        setFormCheckboxes((currData) => {
            currData[name] = checked;
            return { ...currData };
        }
        )

    }


    return (

        <div className="App">
            <Header />

            <main>
                <div className='CreateAnimal'>
                    <h1>Create Animal Profile</h1>
                    <form onSubmit={uploadProfilePic}>
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
                                <label htmlFor="location">Location</label>
                                <input
                                    id="location"
                                    type='text'
                                    name='location'
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder='City, State'>
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
                                <label htmlFor="pet-type">Type</label>
                                <select
                                    id="pet-type"
                                    name='petType'
                                    value={formData.petType}
                                    onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Rabbit">Rabbit</option>
                                    <option value="Small Mammal">Small Mammal</option>
                                    <option value="Bird">Bird</option>
                                    <option value="Reptile">Reptile</option>
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
                                <label htmlFor="pet-size">Size</label>
                                <select
                                    id="pet-size"
                                    value={formData.petSize}
                                    name='petSize'
                                    onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
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
                        </section>

                        <h3>About</h3>
                        <section className='about'>
                            <textarea placeholder='Write a description for the animal.' rows="10" cols="60"></textarea>
                            <label>Upload New Profile Picture</label>
                            <input type="file" id="profilepic" onChange={handlePicUpload} name="profilepic"></input>
                        </section>


                        <h3>Behaviours & Needs</h3>
                        <section className='behaviours'>
                            <div className='checkboxes'>
                                <div className='rowPair'>
                                    <label htmlFor="house-trained">House Trained:</label>
                                    <input
                                        type='checkbox'
                                        id="house-trained"
                                        name='isHouseTrained'
                                        checked={formCheckboxes.isHouseTrained}
                                        onChange={handleCheckbox}>
                                    </input>
                                </div>
                                <div className='rowPair'>
                                    <label htmlFor="other-animals">Good with other animals:</label>
                                    <input
                                        type='checkbox'
                                        id="other-animals"
                                        name='isGoodWithAnimals'
                                        checked={formCheckboxes.isGoodWithAnimals}
                                        onChange={handleCheckbox}>
                                    </input>
                                </div>
                                <div className='rowPair'>
                                    <label htmlFor="kids">Good with kids:</label>
                                    <input
                                        type='checkbox'
                                        id="kids"
                                        name='isGoodWithKids'
                                        checked={formCheckboxes.isGoodWithKids}
                                        onChange={handleCheckbox}>
                                    </input>
                                </div>
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="activity">Activity Level</label>
                                <select
                                    id="activity"
                                    value={formData.activityLevel}
                                    name='activityLevel'
                                    onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="training">Training Level</label>
                                <select
                                    id="training"
                                    name='trainingLevel'
                                    value={formData.trainingLevel}
                                    onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className='columnPair'>
                                <label htmlFor="housing">Housing Requirements</label>
                                <select
                                    id="housing"
                                    name='housing'
                                    value={formData.housing}
                                    onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="Apartment Ok">Apartment Ok</option>
                                    <option value="House">House</option>
                                    <option value="House with Fenced Yard">House with Fenced Yard</option>
                                </select>
                            </div>
                        </section>

                        <h3>Personality</h3>
                        <div className='rowPair'>
                            <label htmlFor="Cuddly">Cuddly:</label>
                            <input
                                type='checkbox'
                                id="cuddly"
                                name='isCuddly'
                                checked={formCheckboxes.isCuddly}
                                onChange={handleCheckbox}>
                            </input>
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </main >

            <Footer></Footer>
        </div >
    );
};
