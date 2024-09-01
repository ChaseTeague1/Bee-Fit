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
        <div>
            <h1>{workout.title}</h1>
            <h2>Exercises</h2>
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
            <button onClick={() => history.goBack()}>Back</button>
        </div>
        );
}

export default WorkoutDetail;