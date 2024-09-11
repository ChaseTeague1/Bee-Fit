import React from "react";
import { useFormik } from "formik";

function Signup({onNewUserSubmit}){

    const formik = useFormik({
        initialValues : {
            name:'',
            email: ''
        },
        onSubmit: (values, {setSubmitting, resetForm}) => {
            fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(values),
            })
            .then(res => res.json())
            .then(data => {
                onNewUserSubmit(data)
                resetForm();
            })
            .finally(() =>
            setSubmitting(false)
        )
        }
    }) 


    return (
        <div className="signup-form-container">
        <form className="form" onSubmit={formik.handleSubmit}>
            <h1>Sign Up Today!</h1>
            <input 
            className="form-input"
            placeholder="Enter Username..."
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            />
            <input 
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter Email..."
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            />
            <button className="form-btn" type="submit">Sign Up!</button>
        </form>
        </div>
    )
}

export default Signup;