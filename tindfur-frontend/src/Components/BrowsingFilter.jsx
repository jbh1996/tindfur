import { useState, useEffect } from "react";

function BrowsingFilter({ onSubmit }) {
  const [animalType, setAnimalType] = useState("");
  const [breed, setBreed] = useState("");
  const [breedOptions, setBreedOptions] = useState([]);
  const [dispositions, setDispositions] = useState([]);
  const [date, setDate] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [shelterName, setShelterName] = useState("");

  // Retrieve breed list
  useEffect(() => {
    if (animalType) {
      fetch(`/breeds/${animalType}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setBreedOptions(data);
          } else {
            setBreedOptions([]);
            
          }
        })
        .catch(err => {
          setBreedOptions([]);
          console.error('Unable to retrieve breed list', err);
        });
      setBreed('');  
    } else {
      setBreedOptions([]);
      setBreed('');
    }
  }, [animalType]);



  const handleCheckboxChange = (value) => {
    if (dispositions.includes(value)) {
      setDispositions(dispositions.filter(item => item !== value));
    } else {
      setDispositions([...dispositions, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare filter object
    const filters = {
      animalType,
      breed,
      dispositions,
      date,
      availability,
      createdBy: shelterName.trim(), // Search by Shelter Name
    };

    // Call onSubmit with the filters object
    onSubmit(filters);
  };

  return (
    <div className="filterCard">
      <h1>Filter</h1>
      <form onSubmit={handleSubmit}>
        <label>Species:</label>
        <select value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
          <option value="">Any</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>

        <label>Breed:</label>
        <select
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          disabled={!animalType}
        >
          <option value="">Select Breed</option>
          {breedOptions.length === 0 ? (
            <option disabled>No breeds available</option>
          ) : (
            breedOptions.map((b, idx) => (
              <option key={idx} value={b}>
              {b}
            </option>
          ))
        )}
        </select>


        <fieldset>
          <legend>Disposition</legend>
          <label>
            <input type="checkbox" value="Good with other animals" onChange={() => handleCheckboxChange("Good with other animals")} />
            Good with other animals
          </label>
          <label>
            <input type="checkbox" value="Good with children" onChange={() => handleCheckboxChange("Good with children")} />
            Good with children
          </label>
          <label>
            <input type="checkbox" value="Animal must be leashed at all times" onChange={() => handleCheckboxChange("Animal must be leashed at all times")} />
            Must be leashed at all times
          </label>
        </fieldset>

        <fieldset>
          <legend>Availability</legend>
          <label>
            <input type="radio" value="Available" checked={availability === "Available"} onChange={(e) => setAvailability(e.target.value)} />
            Available
          </label>
          <label>
            <input type="radio" value="Not Available" checked={availability === "Not Available"} onChange={(e) => setAvailability(e.target.value)} />
            Not Available
          </label>
          <label>
            <input type="radio" value="Pending" checked={availability === "Pending"} onChange={(e) => setAvailability(e.target.value)} />
            Pending
          </label>
          <label>
            <input type="radio" value="Adopted" checked={availability === "Adopted"} onChange={(e) => setAvailability(e.target.value)} />
            Adopted
          </label>
        </fieldset>

        <label>Show pets created after:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />


        <label>Shelter Name:</label>
        <input
          type="text"
          value={shelterName}
          onChange={(e) => setShelterName(e.target.value)}
          placeholder="Shelter Name"
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default BrowsingFilter;