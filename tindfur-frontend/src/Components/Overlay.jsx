import './Overlay.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Overlay({ isOpen, onDelete, onClose, petName }) {
    return (
        <>
            {isOpen && <div className="dialogue">
                <div className='dialogue-background' onClick={onClose}>
                    <div className="dialogue-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete {petName}?</p>
                        <div className="dialogue-actions">
                            <button className='black-outline-rectangle' id='close-delete-pet' onClick={onClose}>Cancel</button>
                            <button className='black-rectangle' id='delete-pet' onClick={onDelete}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}