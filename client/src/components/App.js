import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import WorkoutList from "./WorkoutList";
import ExerciseList from "./ExerciseList";
import ExerciseDetail from "./ExerciseDetail";
import WorkoutDetail from "./WorkoutDetail";
import Login from "./Login";


/* Yup.array()
.of(
  Yup.string()
    .required('You must select an item')  // Ensure an item is selected
    .oneOf(itemOptions.map((option) => option.value), 'Invalid item selected') // Validate it is from the list
) */

function App() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch('/check_session')
      .then(res => res.json())
      .then(data => {
        console.log("Checking data: ", data )
        setUser(data)
      });
  }, []);

  function handleLogin(user){
    setUser(user);
  }

  function handleLogout(){
    setUser(null)
  }

  useEffect(() => {
    fetch('/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

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

  function onNewUserSubmit(newUser){
    setUsers([...users, newUser]);
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
      <NavBar users={users} user={user} onLogout={handleLogout} onNewUserSubmit={onNewUserSubmit}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/workouts">
          <WorkoutList users={users} handleDeleteWorkout={handleDeleteWorkout} exercises={exercises} onNewWorkoutSubmit={onNewWorkoutSubmit} workouts={workouts} />
        </Route>
        <Route exact path="/exercises">
          <ExerciseList onDelete={handleDeleteExercise} onNewExerciseSubmit={onNewExerciseSubmit} exercises={exercises} />
        </Route>
        <Route exact path='/login'>
          <Login onLogin={handleLogin}/>
        </Route>
        <Route path="/exercises/:id" render={(props) => <ExerciseDetail {...props} exercises={exercises} />} />
        <Route path="/workouts/:id" render={(props) => <WorkoutDetail {...props} workouts={workouts} />} />
      </Switch>
    </div>
  );
}

export default App;