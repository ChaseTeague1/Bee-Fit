import React from "react";
import {Link} from "react-router-dom";

function Exercise({exercise}){
    return (
        <div className="e-card">
            <h2>
                <Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link>
            </h2>
        </div>
    )
}

export default Exercise