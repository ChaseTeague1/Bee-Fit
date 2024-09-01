import React, {useState} from "react";
import {useFormik} from 'formik';
import * as yup from "yup";


function NewWorkout({onNewWorkoutSubmit}){

    const formik = useFormik({
        initialValues: {
            title: '',
            duration: '',
            description:'',
        },
        onSubmit: (values, {setSubmitting, resetForm}) => {
            fetch('/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(values),
            })
            .then(res => res.json())
            .then(data => {
                onNewWorkoutSubmit(data)
                resetForm();
            })
            .finally(() =>
            setSubmitting(false)
        )
        }
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <label>Title</label>
            <input 
            className="input-field"
            id='title'
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            />

            <label>Duration (min)</label>
            <input 
            className="input-field"
            id='duration'
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
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
            />

            <button type="submit">Submit</button>
        </form>
    )
}

export default NewWorkout;