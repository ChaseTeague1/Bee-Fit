import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function WorkoutCard({ onDelete, workout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isWindowOpen, setIsWindowOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openWindow = () => {
        setIsWindowOpen(true);
    };

    const closeWindow = () => {
        setIsWindowOpen(false);
    };

    const handleDelete = () => {
        onDelete(workout.id);
        closeWindow();
    };

    return (
        <div className="workout-card-container">
            <div className="menu-container">
                <button className="menu-button" onClick={toggleMenu}>
                    ☰
                </button>
                {isMenuOpen && (
                    <div className="menu-dropdown">
                        <button className="delete-btn" onClick={openWindow}>Delete</button>
                    </div>
                )}
            </div>
            <Link to={`/workouts/${workout.id}`}>
                <div className='workout-card'>
                    <div className="front">
                        <h1 className="w-title">{workout.title}</h1>
                        <p className="w-duration">{workout.duration} min</p>
                        <h3 className="w-description">{workout.description}</h3>
                    </div>
                </div>
            </Link>
            {isWindowOpen && (
                <div className="window-overlay">
                    <div className="window-delete">
                        <p>Are you sure you want to delete <strong>{workout.title}</strong>?</p>
                        <button onClick={closeWindow}>Cancel</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkoutCard;