import React, { useState } from "react";
import Exercise from "./Exercise";
import NewExercise from "./NewExercise";

function ExerciseList({ onDelete, onNewExerciseSubmit, exercises }) {
    const [window, setWindow] = useState(false)

    const groupedExercises = exercises.reduce((groups, exercise) => {
        const category = exercise.category || "Uncategorized";
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(exercise);
        return groups;
    }, {});

    function closeWindow(){
        setWindow(false)
    }

    function openWindow(){
        setWindow(true)
    }

    function handleNewSubmit(e){
        onNewExerciseSubmit(e)
        closeWindow()
    }

    return (
        <div>
            <div className="button-container">
                <button className="open-window-btn" onClick={openWindow}>Add New Exercise</button>
            </div>
            {
                window && (
                    <div className="window-overlay">
                        <div className="window-content">
                            <button className="close-window-btn" onClick={closeWindow}>X</button>
                            <NewExercise onExerciseSubmit={handleNewSubmit} />
                        </div>
                    </div>
                )
            }
            {Object.keys(groupedExercises).map(category => (
                <div className="e-container" key={category}>
                    <h2 className="cat-title">{category}</h2>
                    <div className="card-list">
                    {groupedExercises[category].map(exercise => (
                        <Exercise onDelete={onDelete} key={exercise.id} exercise={exercise} />
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ExerciseList;
