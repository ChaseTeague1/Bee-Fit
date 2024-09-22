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
            <p>{workout.reps}</p>
            <h2>Exercises</h2>
            <div className="w-detail-exercise">
            <ul>
          {workout.exercises.map(we => (
            <Link key={we.exercise.id} className="link" to={`/exercises/${we.exercise.id}`}>
              <li className="e-list">
                {we.exercise.name} - Reps: {we.reps}
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