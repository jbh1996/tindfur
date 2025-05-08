import AnimalCard from "./AnimalCard";

export default function AnimalBrowser({ animalList }) {


  return (
    <div>
      {animalList.map((animal) => (
        <AnimalCard key={animal.id} pet={animal} />
      ))}
    </div>
  );
}