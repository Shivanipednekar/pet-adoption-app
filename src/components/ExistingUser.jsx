import React, { useState } from 'react';
import '../styles/ExistingUser.css';
import { useNavigate } from 'react-router-dom';

const ExistingUser = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email.trim(),
          password: credentials.password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful!");
        navigate("/adoption-list");
      } else {
        setMessage(`❌ ${data.error || "Login failed"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-login">Login</button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.startsWith("❌") ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ExistingUser;
