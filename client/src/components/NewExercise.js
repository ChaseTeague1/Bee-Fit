import React, {useState} from "react";
import Exercise from "./Exercise";

function NewExercise({onExerciseSubmit}){
    const [name, setName] = useState("")
    const [category, setCategory] = useState(['Chest', 'Upper Back', 'Lower Back', 'Arms', 'Abs', 'Legs', 'Shoulders', 'Cardio'])
    const [picture, setPicture] = useState("")
    const [description, setDescription] = useState("")

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

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter exercise name..."/>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter exercise description..."/>
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Select Category...</option>
                { category.map(cate => (
                    <option value={cate}>{cate}</option>
                ))}
            </select>
            <input value={picture} onChange={(e) => setPicture(e.target.value)} placeholder="Enter exercise picture..."/>
            <button type="submit">Add new exercise</button>
        </form>
    )
}

export default NewExercise;