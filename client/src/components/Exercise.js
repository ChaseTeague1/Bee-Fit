import React from "react";
import { Link } from "react-router-dom";

function Exercise({ exercise }) {
    return (
        <Link to={`/exercises/${exercise.id}`} className="e-card-link">
            <div className="e-card-container">
                <div className="e-card">
                    <img className="exercise-picture" src={exercise.picture} alt={exercise.name} />
                    <h2>{exercise.name}</h2>
                </div>
            </div>
        </Link>
    );
}

export default Exercise;