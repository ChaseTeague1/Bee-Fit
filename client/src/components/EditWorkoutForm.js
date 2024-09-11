import React, { useState } from 'react';
import { useFormik } from 'formik';

function EditWorkoutForm({ workout, onUpdate, onCancel, onClose, exercises }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            title: workout.title,
            description: workout.description,
            duration: workout.duration,
            selectedExercises: workout.exercises.map(ex => ex.id.toString()),
        },
        onSubmit: async (values) => {
            try {
                const response = await fetch(`/workouts/${workout.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const updatedWorkout = await response.json();
                onUpdate(updatedWorkout);
                setSuccessMessage('Workout updated successfully!');
                setErrorMessage('');
                onClose();
            } catch (error) {
                setErrorMessage('Failed to update workout.');
                setSuccessMessage(''); 
            }
        },
    });

    const handleCheckboxChange = (event) => {
        const exerciseId = event.target.value;
        if (event.target.checked) {
            formik.setFieldValue("selectedExercises", [
                ...formik.values.selectedExercises,
                exerciseId,
            ]);
        } else {
            formik.setFieldValue(
                "selectedExercises",
                formik.values.selectedExercises.filter((id) => id !== exerciseId)
            );
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className="edit-form">
            <h3>Edit Workout</h3>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
                type="text"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Workout Title"
            />
            <input
                type="text"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="Description"
            />
            <input
                type="number"
                name="duration"
                onChange={formik.handleChange}
                value={formik.values.duration}
                placeholder="Duration (min)"
            />
            <label>Select Exercises</label>
            <div className="checkbox-container">
                {exercises.map((exercise) => (
                    <label key={exercise.id} className="checkbox-label">
                        <input
                            type="checkbox"
                            name="selectedExercises"
                            value={exercise.id.toString()}
                            checked={formik.values.selectedExercises.includes(exercise.id.toString())}
                            onChange={handleCheckboxChange}
                        />
                        {exercise.name}
                    </label>
                ))}
            </div>
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit">Save</button>
        </form>
    );
}

export default EditWorkoutForm;


