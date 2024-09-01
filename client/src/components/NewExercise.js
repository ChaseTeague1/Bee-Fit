import React, {useState} from "react";
import { useFormik } from "formik";
import Exercise from "./Exercise";

function NewExercise({onExerciseSubmit}){
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [picture, setPicture] = useState("")
    const [description, setDescription] = useState("")

    const categories = ['Chest', 'Upper Back', 'Lower Back', 'Arms', 'Abs', 'Legs', 'Shoulders', 'Cardio']

    function handleSubmit(event){
        const newExercise = {
            name : name,
            category : category,
            picture : picture,
            description: description
        }
        event.preventDefault()
        fetch('/exercises', {
            method: "POST",
            headers: {
                'Content-Type' :'application/json'
            },
            body: JSON.stringify(newExercise)
        })
        .then(res => res.json())
        .then(data => {
            onExerciseSubmit(data)
            setCategory("")
            setDescription("")
            setName("")
            setPicture("")
        })
    } 

    /*const formik = useFormik({
        initialValues : {
            name: '',
            category: [],
            picture: '',
            description: '',
        },
        onSubmit: (values, {setSubmitting, resetForm}) => {
            fetch('/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(values),
            })
            .then(res => res.json())
            .then(data => {
                onExerciseSubmit(data)
                resetForm();
            })
            .finally(() =>
            setSubmitting(false)
        )
        }
    }) */

    return (
       <form onSubmit={handleSubmit}>
            <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter exercise name..."/>
            <textarea className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter exercise description..."/>
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Select Category...</option>
                { categories.map(cate => (
                    <option value={cate}>{cate}</option>
                ))}
            </select>
            <input className="input-field" value={picture} onChange={(e) => setPicture(e.target.value)} placeholder="Enter exercise picture..."/>
            <button className="add-btn" type="submit">Add new exercise</button>
        </form>
    )
}

export default NewExercise;