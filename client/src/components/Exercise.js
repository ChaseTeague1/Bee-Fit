import React, {useState} from "react";
import { Link } from "react-router-dom";

function Exercise({onDelete, exercise }) {
    const [window, setWindow] = useState(false)

    function closeWindow(){
        setWindow(false)
    }

    function openWindow(){
        setWindow(true)
    }

    return (
        <div className="e-card-div">
        <Link to={`/exercises/${exercise.id}`} className="e-card-link">
            <div className="e-card-container">
                <div className="e-card">
                    <img className="exercise-picture" src={exercise.picture} alt={exercise.name} />
                    <h2>{exercise.name}</h2>
                </div>
            </div>
        </Link>

        <button className="e-dlt-btn" onClick={openWindow}>Delete</button>
        {
            window && (
                <div className="window-overlay">
                    <div className="window-delete">
                        <p>Are you sure you want to delete {exercise.name}?</p>
                        <button onClick={closeWindow}>Cancel</button>
                        <button className="delete-exercise" onClick={() => onDelete(exercise.id)}>Delete</button>
                    </div>
                </div>
            )
        }
        </div>
    );
}

export default Exercise;