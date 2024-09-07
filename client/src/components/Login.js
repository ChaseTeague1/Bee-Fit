import React, { useState } from "react";
import {useHistory} from 'react-router-dom'

function Login({onLogin}){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory();

    function handleSubmit(e){
        e.preventDefault();
        fetch("/login", {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({username, email})
        })
        .then(res => res.json())
        .then(data => {
            onLogin(data)
            setUsername("")
            setEmail("")
            history.push("/")
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Username: </label>
            <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <label>Email: </label>
            <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;