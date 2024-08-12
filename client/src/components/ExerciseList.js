import React from "react";
import Exercise from "./Exercise";


function ExerciseList({exercises}){
    return (
        <div>
        {
            exercises.map(exercise => (
                <Exercise exercise={exercise}/>
            ))
        }
        </div>
    )
}

export default ExerciseList;