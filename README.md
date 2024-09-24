# Phase 4 Full-Stack Application


## Introduction

welcome! This is my full stack application for my Phase 4 project that I call Bee-Fit. It is a standard workout out companion application that allows users to be able to create exercises that they can then add to a workout that they create. This application has the option for users to make an account and login so when they do create a workout it will have there named tied to it so others can see and or get inspriation from others workouts!

## To get started running application

- Fork and Clone this Repo
- Open 2 terminal windows
- In 1 run npm install --prefix client
- then run npm start --prefix client
- In 2nd window cd into server directory
- then run python app.py

That should now launch the frontend first and then the backend second you may reverse the order of which one you launch first.

# About
## What was used in this application: 
- Flask
- Python
- React
- CSS

This is a full stack application that has 4 models:
- User
- Workout
- Exercise
- Workout_exercise

There are 2 one to many relationships between User - Workout and User - Exercise, there is 1 many to many relationship between Exercsie - Workout which is joined together with a Join table (Workout_exercise) that hold 1 user submittable attribute called "reps".

For all forms of input in this application I have used Formik to handle submits and Yup for validation. 

# Conclusion
I created this application to help users that are wanting a place where they explore workouts created by others that may have more exeperenice in workouts or for users that have more knowledge about certain exercises to have the ability to share to there knowledge to others. This is a place where people can come to better themselves and look for solutions to help them on this journey so it can make it a little more stress free.

