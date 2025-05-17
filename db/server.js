const express = require('express');
const cors = require('cors');
const db = require('./db'); // make sure db.js is in the same folder

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Root route
app.get('/', (req, res) => {
  res.send('Pet Adoption Backend Running');
});

// Register Route
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Basic validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Optional: Check if user already exists
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Insert into DB
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
      [name, email, password, role]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
