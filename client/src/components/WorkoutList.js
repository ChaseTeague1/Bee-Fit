import React, { useState } from "react";
import WorkoutCard from "./WorkoutCard";
import NewWorkout from "./NewWorkout";

function WorkoutList({handleDeleteWorkout, onNewWorkoutSubmit, workouts, exercises, users, onUpdate}) {
    const [newWorkoutWindow, setNewWorkoutWindow] = useState(false)

    function openWindow(){
        setNewWorkoutWindow(true)
    }

    function closeWindow(){
        setNewWorkoutWindow(false)
    }

    function handleWindowClose(e){
        onNewWorkoutSubmit(e)
        closeWindow()
    }

    return (
        <>
        <div className="button-container">
            <button className="open-window-btn" onClick={openWindow}>Add New Workout</button>
        </div>

        {
            newWorkoutWindow && (
                <div className="window-overlay">
                    <div className="window-content">
                        <button className="close-window-btn" onClick={closeWindow}>X</button>
                        <NewWorkout exercises={exercises} onNewWorkoutSubmit={handleWindowClose}/>
                    </div>
                </div>
            )
        }
        <h1 className="workout-title">Workouts</h1>
            <div className="workout-container">
            {
                workouts.map(workout => (
                    <div>
                    <WorkoutCard exercises={exercises} onUpdate={onUpdate} user={users} key={workout.id} workout={workout} onDelete={handleDeleteWorkout}/>
                    </div>
                ))
            }
            </div>
        </>
    )
}

export default WorkoutList;