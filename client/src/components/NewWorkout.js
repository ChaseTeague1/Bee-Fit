import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function NewWorkout({ onNewWorkoutSubmit, exercises }) {

    const validationSchema = Yup.object({
        title : Yup.string()
                .max(15, 'Title must be 15 characters or less')
                .required('Required'),
        duration: Yup.number()
                .required('Required'),
        description: Yup.string()
                .min(10, 'Description must be atleast 10 characters')
                .required('Required'), 
        selectedExercises: Yup.array()
                .min(1, 'You must select at least one exercise')
                .of(Yup.string().required('Exercise selection is required'))
    })

    const formik = useFormik({
        initialValues: {
          title: '',
          duration: '',
          description: '',
          selectedExercises: [], 
          reps: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
          fetch('/workouts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: values.title,
              duration: values.duration,
              description: values.description,
            }),
          })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to create workout');
            }
            return res.json();
          })
          .then((workoutData) => {
            const { id: workout_id } = workoutData;
      
            const exercisePromises = values.selectedExercises.map((exercise_id) => {
              return fetch('/workoutexercise', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  workout_id, 
                  exercise_id,
                  reps: values.reps, 
                }),
              })
              .then((res) => {
                if (!res.ok) {
                  throw new Error('Failed to create workout-exercise relationship');
                }
                return res.json();
              });
            });
      
            return Promise.all(exercisePromises);
          })
          .then((repData) => {
            console.log('Workout-exercise data:', repData);
            resetForm(); 
            onNewWorkoutSubmit();
          })
          .catch((error) => {
            console.error('Error:', error);
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
      {formik.errors.title && <div>{formik.errors.title}</div>}
      <input
        className="input-field"
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />

      <label>Duration (min)</label>
      {formik.errors.duration && <div>{formik.errors.duration}</div>}
      <input
        className="input-field"
        id="duration"
        name="duration"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.duration}
      />

      <label>Description</label>
      {formik.errors.description && <div>{formik.errors.description}</div>}
      <textarea
        className="input-field"
        id="description"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
      />

    <label>Select Exercises</label>
    {formik.errors.selectedExercises && <div>{formik.errors.selectedExercises}</div>}
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

    <label>Reps: </label>
    <input 
    type="text"
    id="reps"
    name="reps"
    onChange={formik.handleChange}
    value={formik.values.reps}
    />
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewWorkout;


