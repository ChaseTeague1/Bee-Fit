import React from 'react';

const HomePage = () => {
  return (
    <div>
    <div className="image-container">
      <img className="home-img" src="/pexels-leonardho-1552242.jpg" alt="background" />
      <div className="overlay">
      </div>
    </div>
    <div className='home-title'>
        <h1>Welcome to Bee-Fit</h1>
        <p>Your Ultimate Workout Companion</p>
    </div>
    <div className='home-body'>
      <p>
        At Bee-Fit, we're committed to helping you achieve your fitness goals, whether you're just starting out or you're a seasoned athlete...
      </p>
      <h2>Explore Our Features:</h2>
      <ul>
        <li>Tailored Workouts: Choose from a variety of workouts created for you.</li>
        <li>Exercise Library: Access a comprehensive library of exercises, each with detailed instructions and pictures to ensure perfect form.</li>
      </ul>
      <p>
        <strong>Get Started Today</strong><br />
        Sign up now to start your fitness journey with Bee-Fit...
      </p>
      </div>
    </div>
  );
};

export default HomePage;
