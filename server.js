const express = require('express');
const cors = require('cors');
const pool = require('C:\\Users\\SP\\Desktop\\Pet_adoption\\db\\db.js'); // Adjust path if needed
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Register route
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    console.log('Registering user:', { name, email, password, role });

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );

    console.log('Insert result:', result);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.sqlMessage || error.message || error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Pets list route
app.get('/pets', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pets WHERE available = true and available = false');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching pets:', error.sqlMessage || error.message || error);
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
