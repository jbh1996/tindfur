import './ViewAnimals.css';
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';
import ShelterFilter from './ShelterFilter';

export default function ViewAnimals() {
    return (
        <div className="App">
            <Header />
            <main>
                <ShelterFilter />
            </main>
            <Footer />
        </div>
    )
}