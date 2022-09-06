import React, { useEffect, useState } from "react";

function App() {
  const [pupsAry, setPupsAry] = useState([])
  const [displayDog, setDisplayDog] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/pups')
    .then(r => r.json())
    .then(data => setPupsAry(data));
  }, []);

  function displayDogDetails (dog) {
    setDisplayDog(dog);
  }

  function toggleGoodDog () {
    const updateDog = {
      ...displayDog,
      isGoodDog: !displayDog.isGoodDog
    }
    setDisplayDog(updateDog)
    fetch(`http://localhost:3001/pups/${displayDog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateDog)
    })
  }

  function toggleGoodDogFilter () {
    console.log('hi');
  }

  const dogBarSpans = pupsAry.map(dog => {
    return <span key={dog.id} onClick={() => displayDogDetails(dog)}>{dog.name}</span>
  });

  const dogDetails = (<>
    <img src={displayDog.image} alt={displayDog.name} />
    <h2>{displayDog.name}</h2>
    <button onClick={toggleGoodDog}>{displayDog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
  </>);

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={toggleGoodDogFilter}>Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">{dogBarSpans}</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">{dogDetails}</div>
      </div>
    </div>
  );
}

export default App;
