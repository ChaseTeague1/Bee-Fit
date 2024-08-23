import React from "react";
import WorkoutCard from "./WorkoutCard";
import NewWorkout from "./NewWorkout";

function WorkoutList({onNewWorkoutSubmit, workouts, exercises}) {

    return (
        <>
        <NewWorkout exercises={exercises} onNewWorkoutSubmit={onNewWorkoutSubmit}/>
        <h1 className="workout-title">Workouts</h1>
            <div className="workout-container">
            {
                workouts.map(workout => (
                    <WorkoutCard key={workout.id} workout={workout}/>
                ))
            }
            </div>
        </>
    )
}

export default WorkoutList;