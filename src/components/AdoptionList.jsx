import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdoptionList.css';

const AdoptionList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Replace with your actual backend endpoint
    axios.get('http://localhost:5000/pets')
      .then(response => setPets(response.data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  const handleAdopt = (petId) => {
    alert(`You have requested to adopt pet with ID: ${petId}`);
    // You can add API call to mark as adopted here
  };

  return (
    <div className="adoption-list">
      <h1>Pets Available for Adoption 🐶🐱</h1>
      <div className="pet-grid">
        {pets.map(pet => (
          <div className="pet-card" key={pet.id}>
            <img src={pet.image_url} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p>{pet.description}</p>
            <button onClick={() => handleAdopt(pet.id)}>Adopt</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptionList;
