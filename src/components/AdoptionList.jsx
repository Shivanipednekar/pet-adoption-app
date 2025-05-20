import React, { useEffect, useState } from "react";
import "../styles/AdoptionList.css";
const AdoptionList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching pets...");
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:5000/pets");
        const data = await response.json();
         console.log("Fetched pets:", data)
        setPets(data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pets Available for Adoption</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pets.length === 0 ? (
        <p>No pets currently available for adoption.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >
          {pets.map((pet) => (
            <div
              key={pet.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <h3>{pet.name}</h3>
              <p><strong>Species:</strong> {pet.species}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Age:</strong> {pet.age} years</p>
              <p>
                <strong>Status:</strong>{" "}
                {pet.available ? "✅ Available" : "❌ Not Available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdoptionList;
