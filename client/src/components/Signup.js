import React, { useState } from "react";

function Signup({onNewUserSubmit}){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    function handleSubmit(e){
        const newUser = {
            name: name,
            email: email
        }
        e.preventDefault();
        fetch('/users', {
            method: "POST",
            headers: {
                'Content-Type' :'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            onNewUserSubmit(data)
            setEmail("")
            setName("")
        })
    }


    return (
        <div className="signup-form-container">
        <form className="form" onSubmit={handleSubmit}>
            <h1>Sign Up Today!</h1>
            <input 
            className="form-input"
            placeholder="Enter Username..."
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input 
            className="form-input"
            placeholder="Enter Email..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button className="form-btn" type="submit">Sign Up!</button>
        </form>
        </div>
    )
}

export default Signup;