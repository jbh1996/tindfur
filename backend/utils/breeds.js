
const catBreeds = [
    'Domestic Shorthair', 'American Shorthair', 'Domestic Longhair', 
    'Siamese', 'Maine Coon', 'Ragdoll', 'Russian Blue', 'Bombay', 
    'Bengal', 'Siberian', 'Other'
  ];
  
  const dogBreeds = [
    'French Bulldog', 'Labrador Retriever', 'Golden Retriever', 
    'German Shepherd Dog', 'Poodle', 'Dachshund', 'Beagle', 
    'Rottweiler', 'Bulldog', 'German Shorthaired Pointer', 'Other'
  ];
  
  const breeds = { cat: catBreeds, dog: dogBreeds, other: ['Other'] };
  
  module.exports = { catBreeds, dogBreeds, breeds };
  
