import React, { useState } from 'react';
import {Link} from 'react-router-dom';


function WorkoutCard({ onDelete, workout }) {
    const [window, setWindow] = useState(false)

    function closeWindow(){
        setWindow(false)
    }

    function openWindow(){
        setWindow(true)
    }

    return (
        <div>
        <div className="workout-card-container">
            <Link to={`/workouts/${workout.id}`}>
            <div className='workout-card'>
                <div className="front">
                    <h1 className="w-title">{workout.title}</h1>
                    <p className="w-duration">{workout.duration}</p>
                    <h3 className="w-description">{workout.description}</h3>
                </div>
            </div>
            </Link>
        </div>
        <button onClick={openWindow}>Delete</button>
        {
            window && (
                <div className="window-overlay">
                    <div className="window-delete">
                        <p>Are you sure you want to delete <strong>{workout.title}</strong>?</p>
                        <button onClick={closeWindow}>Cancel</button>
                        <button className="delete-btn" onClick={() => onDelete(workout.id)}>Delete</button>
                    </div>
                </div>
            )
        }
        </div>
    );
}

export default WorkoutCard;