import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

function NewExercise({onExerciseSubmit}){
    const categories = ['Chest', 'Upper Back', 'Lower Back', 'Arms', 'Abs', 'Legs', 'Shoulders', 'Cardio'];

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Exercise name is required')
            .min(2, 'Name must be at least 2 characters long'),
        category: Yup.string()
            .required('Please select a category')
            .oneOf(categories, 'Invalid category selection'),
        picture: Yup.string()
            .url('Enter a valid URL'),
        description: Yup.string()
            .required('Description is required')
            .min(10, 'Description must be at least 10 characters long')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            category: '',
            picture: '',
            description: '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            fetch('/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then(res => res.json())
            .then(data => {
                onExerciseSubmit(data);
                resetForm();
            })
            .finally(() => setSubmitting(false));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.errors.name && <div>{formik.errors.name}</div>}
            <input
                className="input-field"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter exercise name..."
            />
            
            {formik.errors.description && <div>{formik.errors.description}</div>}
            <textarea
                className="input-field"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder="Enter exercise description..."
            />
            
            {formik.errors.category && <div>{formik.errors.category}</div>}
            <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
            >
                <option value="">Select Category...</option>
                {categories.map(cate => (
                    <option key={cate} value={cate}>{cate}</option>
                ))}
            </select>
            
            {formik.errors.picture && <div>{formik.errors.picture}</div>}
            <input
                className="input-field"
                name="picture"
                value={formik.values.picture}
                onChange={formik.handleChange}
                placeholder="Enter exercise picture URL..."
            />

            <button className="add-btn" type="submit" disabled={formik.isSubmitting}>
                Add new exercise
            </button>
        </form>
    );
}

export default NewExercise;
