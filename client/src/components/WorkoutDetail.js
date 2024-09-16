import React from "react";
import {useParams, Link, useHistory} from 'react-router-dom';

function WorkoutDetail({workouts}){
    const { id } = useParams();
    const workout = workouts.find(work => work.id === parseInt(id));
    const history = useHistory();  

    if (!workout) {
        return <h2>Exercise not found</h2>;
    }
      
    return (
        <div className="w-detail-container">
            <h1>{workout.title}</h1>
            <h3>{workout.description}</h3>
            <h2>Exercises</h2>
            <div className="w-detail-exercise">
            <ul>
                {workout.exercises.map(exercise => (
                    <Link className="link" to={`/exercises/${exercise.id}`}>
                        <li className="e-list" key={exercise.id}>
                            {exercise.name}
                        </li>
                        </Link>
                ))}
            </ul>
            </div>
            <button onClick={() => history.goBack()}>Back</button>
        </div>
        );
}

export default WorkoutDetail;