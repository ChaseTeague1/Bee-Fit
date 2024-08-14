import React from "react";
import Exercise from "./Exercise";
import NewExercise from "./NewExercise";

function ExerciseList({ onNewExerciseSubmit, exercises }) {
    // Group exercises by category directly in the component
    const groupedExercises = exercises.reduce((groups, exercise) => {
        const category = exercise.category || "Uncategorized";
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(exercise);
        return groups;
    }, {});

    return (
        <div>
            <NewExercise onExerciseSubmit={onNewExerciseSubmit} />
            {Object.keys(groupedExercises).map(category => (
                <div key={category}>
                    <h2>{category}</h2>
                    {groupedExercises[category].map(exercise => (
                        <Exercise key={exercise.id} exercise={exercise} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ExerciseList;
