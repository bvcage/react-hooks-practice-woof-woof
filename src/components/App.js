import React, { useEffect, useState } from "react";

function App() {
  const [pupsAry, setPupsAry] = useState([])

  const pupsData = useEffect(() => {
    fetch('http://localhost:3001/pups')
    .then(r => r.json())
    .then(data => setPupsAry(data));
  }, []);

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter">Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">{
        pupsAry.map(dog => {
          return <span>{dog.name}</span>
        })
      }</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info"></div>
      </div>
    </div>
  );
}

export default App;
