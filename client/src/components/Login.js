import React from "react";
import {useHistory} from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from 'yup';

function Login({onLogin}){
    const history = useHistory();


    const formik = useFormik({
        initialValues : {
            username:'',
            email: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: (values, {setSubmitting, resetForm}) => {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(values),
            })
            .then(res => res.json())
            .then(data => {
                onLogin(data)
                resetForm();
                history.push('/')
            })
            .finally(() =>
            setSubmitting(false)
        )
        }
    }) 

    return (
        <div className="signup-form-container">
        <form className="form" onSubmit={formik.handleSubmit}>
            <label>Username: </label>
            <input 
            id="username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            />

            <label>Email: </label>
            <input 
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            />
            <button type="submit">Login</button>
        </form>
        </div>
    )
}

export default Login;