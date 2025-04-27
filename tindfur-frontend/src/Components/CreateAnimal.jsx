import React, { useState } from 'react';
import './CreateAnimal.css';

function CreateAnimal() {
    const [animalType, setAnimalType] = useState('dog');
    const [breed, setBreed] = useState('');
    const [disposition, setDisposition] = useState([]);
    const [availability, setAvailability] = useState('Available');
    const [picture, setPicture] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // Handle disposition selection (multiple options)
    const handleDispositionChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setDisposition(selectedOptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate required fields
        if (!breed || !animalType || !disposition.length) {
            setMessage('Please fill in all required fields.');
            setIsSuccess(false);
            return;
        }

        try {
            const response = await fetch('/petprofile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    animalType,
                    breed,
                    disposition,
                    availability,
                    imageUrl: picture,  // Changed 'picture' to 'imageUrl' to match the backend
                    description,
                    createdBy: localStorage.getItem('user_id'), // Assuming the user ID is stored in localStorage
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(`Error: ${data.message}`);
                setIsSuccess(false);
            } else {
                setMessage('Pet profile created successfully!');
                setIsSuccess(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Something went wrong. Please try again later.');
            setIsSuccess(false);
        }
    };

    return (
        <div className="animal-form-container">
            <h1>Create New Animal Profile</h1>

            <form onSubmit={handleSubmit}>
                <label>Animal Type</label>
                <select
                    value={animalType}
                    onChange={(e) => setAnimalType(e.target.value)}
                >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                </select>

                <label>Breed</label>
                <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    required
                />

                <label>Disposition</label>
                <select
                    value={disposition}
                    onChange={(e) => setDisposition(e.target.value)}  // Update to set a single selected value
                    required
                >
                    <option value="">Select a disposition</option>
                    <option value="Good with other animals">Good with other animals</option>
                    <option value="Good with children">Good with children</option>
                    <option value="Animal must be leashed at all times">Animal must be leashed at all times</option>
                </select>

                <label>Availability</label>
                <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                    <option value="Pending">Pending</option>
                    <option value="Adopted">Adopted</option>
                </select>

                <label>Picture URL</label>
                <input
                    type="url"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                />

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Create Animal Profile</button>
            </form>

            {message && (
                <div className={isSuccess ? 'success-message' : 'error-message'}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default CreateAnimal;
