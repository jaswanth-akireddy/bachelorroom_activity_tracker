// App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for styling

const people = [
  { id: 1, name: "Person 1" },
  { id: 2, name: "Person 2" },
  { id: 3, name: "Person 3" },
  { id: 4, name: "Person 4" },
];

function App() {
  // Initialize state from localStorage or default to 0 for each person
  const [counts, setCounts] = useState(() => {
    const savedCounts = localStorage.getItem("activityCounts");
    return savedCounts ? JSON.parse(savedCounts) : people.map(() => 0);
  });

  // Check if the month changed, if yes, reset the counts
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const savedMonth = localStorage.getItem("currentMonth");

    if (savedMonth && parseInt(savedMonth) !== currentMonth) {
      resetCounts();
      localStorage.setItem("currentMonth", currentMonth);
    } else {
      // Save the current month in localStorage
      localStorage.setItem("currentMonth", currentMonth);
    }
  }, []);

  // Update localStorage whenever counts change
  useEffect(() => {
    localStorage.setItem("activityCounts", JSON.stringify(counts));
  }, [counts]);

  // Function to handle increment
  const incrementCount = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  // Function to reset the counts (Monthly refresh)
  const resetCounts = () => {
    const resetCounts = people.map(() => 0);
    setCounts(resetCounts);
    localStorage.setItem("activityCounts", JSON.stringify(resetCounts));
  };

  return (
    <div className="container">
      <h1>Activity X Tracker</h1>
      <div className="people-container">
        {people.map((person, index) => (
          <div key={person.id} className="person-card">
            <span className="person-name">{person.name}</span>
            <span className="person-count">Count: {counts[index]}</span>
            <button
              className="increment-button"
              onClick={() => incrementCount(index)}
            >
              Increment
            </button>
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetCounts}>
        Monthly Refresh
      </button>
    </div>
  );
}

export default App;
