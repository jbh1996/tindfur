import './ViewAnimals.css'; // reuse styling
import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';

export default function ViewUsers() {
    const redirect = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const { isLoggedIn, isShelter } = userAuth();
        if (!isLoggedIn || !isShelter) {
            redirect("/login");
        }
    }, [redirect]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="App">
            <Header />
            <main>
                <h2 style={{ textAlign: 'center' }}>Registered Users</h2>
                <ul className="Animals"> {/* Reuse layout class */}
                    {users.map((user) => (
                        <li key={user._id} className="animalLink">
                            <div className="AnimalCard">
                                <img src={user.profilePic} alt="" />
                                <h4>{user.name || user.username}</h4>
                                <p>{user.email}</p>
                                <p>{user.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
            <Footer />
        </div>
    );
}
