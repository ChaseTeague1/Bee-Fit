import React from "react";
import { useParams, useHistory } from "react-router-dom";

function ExerciseDetail({ exercises }) {
  const { id } = useParams();
  const history = useHistory();
  const exercise = exercises.find(exercise => exercise.id === parseInt(id));

  if (!exercise) {
    return <h2>Exercise not found</h2>;
  }

  return (
    <div>
      <h2>{exercise.name}</h2>
      <p>{exercise.description}</p>
      <img src={exercise.picture}/>
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
}

export default ExerciseDetail;