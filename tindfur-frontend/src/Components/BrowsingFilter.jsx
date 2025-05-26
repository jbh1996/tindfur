import { useState, useEffect } from "react";
import './BrowsingFilter.css';

function BrowsingFilter({ onSubmit }) {
  const [animalType, setAnimalType] = useState("");
  const [breed, setBreed] = useState("");
  const [breedOptions, setBreedOptions] = useState([]);
  const [dispositions, setDispositions] = useState([]);
  const [date, setDate] = useState("");
  const [availability, setAvailability] = useState("");
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




  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare filter object
    const filters = {
      animalType,
      breed,
      disposition: dispositions,
      createdAt: date,
      availability,
      createdBy: shelterName.trim(),
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


        <label>Disposition:</label>
        <select
          value={dispositions[0] || ""}
          onChange={(e) => {
          const val = e.target.value;
          setDispositions(val ? [val] : []);
          }}
        >
        <option value="">None</option>
        {[
          "Good with Other Animals",
          "Good with Kids",
          "Must Be on Leash",
          "Apartment OK",
          "House Trained",
          "Needs Fenced Yard"
        ].map((disp) => (
          <option key={disp} value={disp}>{disp}</option>
        ))}
      </select>

        <label>Availability:</label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          >
          <option value="">Any</option>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
          <option value="Pending">Pending</option>
          <option value="Adopted">Adopted</option>
      </select>

        <label>Profile Created On:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Any date"
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