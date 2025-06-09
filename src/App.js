import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Import the CSS file

function Stopwatch() {
  const [time, setTime] = useState(() => {
    // Retrieve cached time from local storage or initialize to 0
    const savedTime = localStorage.getItem('stopwatch-time');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Cache the time in local storage whenever it changes
    localStorage.setItem('stopwatch-time', time);
  }, [time]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    localStorage.removeItem('stopwatch-time'); // Clear cached time
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-title">Stopwatch</h1>
      <p className="stopwatch-time">{formatTime(time)}</p>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startTimer}>Start</button>
        <button className="stopwatch-button" onClick={pauseTimer}>Pause</button>
        <button className="stopwatch-button" onClick={stopTimer}>Stop</button>
      </div>
    </div>
  );
}

export default Stopwatch;