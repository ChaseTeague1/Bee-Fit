import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {


  return (
    <nav className="nav-bar">
        <NavLink 
        to="/"
        exact
        className="nav-links"
        >
            Home
        </NavLink>
        <NavLink 
        className="nav-links" 
        to="/workouts"
        >
            Workouts
        </NavLink>
        <NavLink
        className ="nav-links"
        to="/exercises"
        >
            Exercises
        </NavLink>
    </nav>
  );
}

export default NavBar;