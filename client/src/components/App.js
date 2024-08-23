import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import NewWorkout from "./NewWorkout";
import WorkoutList from "./WorkoutList";
import ExerciseList from "./ExerciseList";
import ExerciseDetail from "./ExerciseDetail";

function App() {
  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [workouts, setWorkouts] = useState([])
  const [exercises, setExercises] = useState([])

  const categories = ['Chest', 'Arms', 'Upper Back', 'Lower Back', 'Legs', 'Abs']

  useEffect(() => {
    fetch('/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  useEffect(() => {
    fetch('/workouts')
    .then(res => res.json())
    .then(data => setWorkouts(data))
  }, [])

  useEffect(() => {
    fetch('/exercises')
    .then(res => res.json())
    .then(data => setExercises(data))
  }, [])

  function onNewWorkoutSubmit(newWorkout){
    setWorkouts([...workouts, newWorkout])
  }

  function onNewExerciseSubmit(newExercise){
    setExercises([...exercises, newExercise])
  }

  return (
    <div className="app-container">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/workouts">
          <WorkoutList exercises={exercises} onNewWorkoutSubmit={onNewWorkoutSubmit} workouts={workouts}/>
        </Route>
        <Route exact path="/exercises">
          <ExerciseList onNewExerciseSubmit={onNewExerciseSubmit} exercises={exercises}/>
        </Route>
        <Route 
        path="/exercises/:id" 
        render ={(props) => <ExerciseDetail {...props} exercises={exercises}/>}
        />
      </Switch>
    </div>
  )
}

export default App;