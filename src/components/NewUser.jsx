import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NewUser.css";

const NewUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ User registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: ""
        });

        // Redirect to AdoptionList page
        navigate("/adoption-list");
      } else {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Looking to Adopt">Looking to Adopt</option>
            <option value="Giving for Adoption">Giving for Adoption</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.startsWith("❌") ? "red" : "green"
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default NewUser;
