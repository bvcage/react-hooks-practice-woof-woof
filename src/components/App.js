import React, { useEffect, useState } from "react";

function App() {
  const [allDogsAry, setAllDogsAry] = useState([]);
  const [dogBarAry, setDogBarAry] = useState([]);
  const [dogToDisplay, setDogToDisplay] = useState({});
  const [goodDogsOnly, setGoodDogsOnly] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/pups')
    .then(r => r.json())
    .then(data => {
      setAllDogsAry(data);
      setDogBarAry(data);
    });
  }, []);

  function displayDogDetails (dog) {
    setDogToDisplay(dog);
  }

  function toggleDogIsGood () {
    const updateDog = {
      ...dogToDisplay,
      isGoodDog: !dogToDisplay.isGoodDog
    }
    setDogToDisplay(updateDog);
    
    const updatedDogsAry = allDogsAry.map(dog => {
      if (dog.id === updateDog.id) return updateDog;
      else return dog;
    })
    setAllDogsAry(updatedDogsAry);
    if (goodDogsOnly) {
      const goodDogAry = updatedDogsAry.filter(dog => dog.isGoodDog)
      updateDogBarAry(goodDogAry);
    } else {
      updateDogBarAry(updatedDogsAry);
    }
    
    fetch(`http://localhost:3001/pups/${dogToDisplay.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateDog)
    })
  }

  function toggleGoodDogFilter () {
    const newStatus = !goodDogsOnly;
    setGoodDogsOnly(newStatus);

    if (newStatus) {
      const goodDogAry = allDogsAry.filter(dog => dog.isGoodDog);
      updateDogBarAry(goodDogAry);
    } else {
      updateDogBarAry(allDogsAry);
    }
  }

  function updateDogBarAry (newAry) {
    setDogBarAry(newAry);
  }

  let dogBarSpans = dogBarAry.map(dog => {
    return <span key={dog.id} onClick={() => displayDogDetails(dog)}>{dog.name}</span>
  });

  const dogDetails = (<>
    <img src={dogToDisplay.image} alt={dogToDisplay.name} />
    <h2>{dogToDisplay.name}</h2>
    <button onClick={toggleDogIsGood}>{dogToDisplay.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
  </>);

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={toggleGoodDogFilter}>Filter good dogs: {goodDogsOnly? "ON" : "OFF"}</button>
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
