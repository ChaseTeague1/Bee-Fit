import React from "react";
import { useFormik } from 'formik';

function NewWorkout({ onNewWorkoutSubmit, exercises }) {
  const formik = useFormik({
    initialValues: {
      title: '',
      duration: '',
      description: '',
      selectedExercises: [], 
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      fetch('/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          onNewWorkoutSubmit(data);
          resetForm();
        })
        .finally(() => setSubmitting(false));
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
    <form onSubmit={formik.handleSubmit}>
      <label>Title</label>
      <input
        className="input-field"
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />

      <label>Duration (min)</label>
      <input
        className="input-field"
        id="duration"
        name="duration"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.duration}
      />

      <label>Description</label>
      <textarea
        className="input-field"
        id="description"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewWorkout;


