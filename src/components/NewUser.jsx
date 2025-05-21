import React, { useState } from 'react';
import '../styles/NewUser.css';  // make sure path & filename are correct
import { useNavigate } from 'react-router-dom';

const NewUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Looking to Adopt" // or default user_type
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Registration successful!");
        navigate("/adoption-list"); // or wherever you want
      } else {
        setMessage(`❌ ${data.error || "Registration failed"}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="new-user-container">
      <h2>Register New User</h2>
      <form className="new-user-form" onSubmit={handleSubmit}>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">User Type</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="Looking to Adopt">Looking to Adopt</option>
          <option value="Giving for Adoption">Giving for Adoption</option>
        </select>

        <button type="submit">Register</button>
      </form>

      {message && (
        <p className="message" style={{ color: message.startsWith('❌') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default NewUser;
