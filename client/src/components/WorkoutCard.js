import React, { useState } from 'react';
import {Link} from 'react-router-dom';


function WorkoutCard({ workout }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="workout-card-container">
            <div 
                onClick={handleClick} 
                className={`workout-card ${isFlipped ? 'flip' : ''}`}
            >
                <div className="front">
                    <h1 className="w-title">{workout.title}</h1>
                    <p className="w-duration">{workout.duration}</p>
                    <h3 className="w-description">{workout.description}</h3>
                </div>
                <div className="back">
                    <ul>
                        {workout.exercises.map(exercise => (
                            <ul>
                                <li className="e-list" key={exercise.id}>
                                    <Link to={`/exercises/${exercise.id}`}>
                                    {exercise.name}
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default WorkoutCard;