import React from "react";
import {Link} from "react-router-dom";

function Exercise({exercise}){
    return (
        <div className="e-card-container">
            <h2 className="e-card">
                <Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link>
                <button type="click">✎</button>
            </h2>
        </div>
    )
}

export default Exercise