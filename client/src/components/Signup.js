import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

function Signup({onNewUserSubmit}){

    const formik = useFormik({
        initialValues : {
            name:'',
            email: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().max(15, 'Name must be 15 characters or less').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required')
        }),
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