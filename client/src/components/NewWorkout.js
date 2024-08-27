import React, {useState} from "react";
import {useFormik} from 'formik';
import * as yup from "yup";


    /*const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("") */

 /*   function handleSubmit(event){
        const newWorkout = {
            title: title,
            description: description,
            duration: duration
        }
        event.preventDefault()
        fetch('/workouts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWorkout)
        })
        .then(res => res.json())
        .then(data => {
            onNewWorkoutSubmit(data)
            setTitle("")
            setDescription("")
            setDuration("")
        })
    } */
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
            id='title'
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            />

            <input 
            id='duration'
            name="duration"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.duration}
            />

            <input 
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