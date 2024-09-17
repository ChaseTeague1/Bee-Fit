import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";


function NavBar({onLogin, users, user, onLogout, onNewUserSubmit}) {
    const [userWindow, setUserWindow] = useState(false)
    const [loginWindow, setLoginWindow] = useState(false)

    function closeWindow(){
      setUserWindow(false)
    }
  
    function openWindow(){
      setUserWindow(true)
    }
  
    function handleWindowClose(e){
      onNewUserSubmit(e)
      closeWindow()
  }

  function closeLogin(){
    setLoginWindow(false)
  }

  function openLogin(){
    setLoginWindow(true)
  }

  function handleLoginClose(e){
    onLogin(e)
    closeLogin()
  }

    function handleLogout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(() => onLogout())
    }

  return (
    <div>
    <div className="auth-buttons">
        {user && user.name ? (
            <div className="welcome-logout">
            <p>Welcome, {user.name} </p>
            <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <>
            <button className="login-btn" onClick={openLogin}>Login</button>
                {
                    loginWindow && (
                        <div className="window-overlay">
                            <div className="window-content">
                                <button className="close-window-btn" onClick={closeLogin}>X</button>
                                <Login onLogin={handleLoginClose}/>
                            </div>
                        </div>
                    )
                }
                <div>
        <div className="button-container">
              <button className="signup-login-btn" onClick={openWindow}>Sign Up!</button>
          </div>
          {
              userWindow && (
                  <div className="window-overlay">
                      <div className="window-content">
                          <button className="close-window-btn" onClick={closeWindow}>X</button>
                          <Signup users={users} onNewUserSubmit={handleWindowClose}/>
                      </div>
                  </div>
              )
          }
      </div>
            </>
        )}
    </div>
    <nav className="nav-bar">
        <div className="nav-home">
            <NavLink 
                to="/"
                exact
                className="nav-home-link"
            >
                <img className="nav-image" height={90} width={90} src={'/honeycomb.png'} alt="logo" />
            </NavLink>
            <h1>BeeFit</h1>
        </div>
        <div className="nav-links-container">
            <NavLink className="nav-links" to="/workouts">
                Workouts
            </NavLink>
            <NavLink className="nav-links" to="/exercises">
                Exercises
            </NavLink>
        </div>
    </nav>
</div>

  );
}

export default NavBar;