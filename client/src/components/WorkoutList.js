import React from "react";
import WorkoutCard from "./WorkoutCard";
import NewWorkout from "./NewWorkout";

function WorkoutList({handleDeleteWorkout, onNewWorkoutSubmit, workouts, exercises}) {

    return (
        <>
        <NewWorkout exercises={exercises} onNewWorkoutSubmit={onNewWorkoutSubmit}/>
        <h1 className="workout-title">Workouts</h1>
            <div className="workout-container">
            {
                workouts.map(workout => (
                    <div>
                    <WorkoutCard key={workout.id} workout={workout} onDelete={handleDeleteWorkout}/>
                    </div>
                ))
            }
            </div>
        </>
    )
}

export default WorkoutList;