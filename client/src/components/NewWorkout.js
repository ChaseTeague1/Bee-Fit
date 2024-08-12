import React, {useState} from "react";

function NewWorkout({onNewWorkoutSubmit}){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("")

    function handleSubmit(event){
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
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter title..."/>
            <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Enter description..."/>
            <input onChange={(e) => setDuration(e.target.value)} value={duration} type="text" placeholder="Enter duration..."/>
            <button type="submit">Add New Workout</button>
        </form>
    )
}

export default NewWorkout;