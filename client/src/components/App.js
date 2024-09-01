import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import WorkoutList from "./WorkoutList";
import ExerciseList from "./ExerciseList";
import ExerciseDetail from "./ExerciseDetail";
import WorkoutDetail from "./WorkoutDetail";

function App() {
  const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    fetch('/workouts')
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);

  useEffect(() => {
    fetch('/exercises')
      .then(res => res.json())
      .then(data => setExercises(data));
  }, []);

  function onNewWorkoutSubmit(newWorkout) {
    setWorkouts([...workouts, newWorkout]);
  }

  function onNewExerciseSubmit(newExercise) {
    setExercises([...exercises, newExercise]);
  }

  function handleDeleteWorkout(id){
    fetch(`/workouts/${id}`, {
      method:'DELETE',
    })
    .then(res => {
      if (res.ok) {
        setWorkouts((workouts) => workouts.filter((workout) => workout.id !== id))
      }
    })
  }

  function handleDeleteExercise(id){
    fetch(`/exercises/${id}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        setExercises((exercises) => exercises.filter((exercise) => exercise.id !== id))
      }
    })
  }

  return (
    <div className="app-container">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/workouts">
          <WorkoutList handleDeleteWorkout={handleDeleteWorkout} exercises={exercises} onNewWorkoutSubmit={onNewWorkoutSubmit} workouts={workouts} />
        </Route>
        <Route exact path="/exercises">
          <ExerciseList onDelete={handleDeleteExercise} onNewExerciseSubmit={onNewExerciseSubmit} exercises={exercises} />
        </Route>
        <Route path="/exercises/:id" render={(props) => <ExerciseDetail {...props} exercises={exercises} />} />
        <Route path="/workouts/:id" render={(props) => <WorkoutDetail {...props} workouts={workouts} />} />
      </Switch>
    </div>
  );
}

export default App;