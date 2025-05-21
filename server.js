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


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = rows[0];

    // For now: simple comparison — in production, use bcrypt
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Optionally send user data (omit password)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        user_type: user.user_type,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Pets list route

app.get('/pets', async (req, res) => {
  console.log("🔍 /pets route hit"); // ADD THIS LINE
  try {
    const [rows] = await pool.query('SELECT * FROM pet_adoption_1.pets');
    console.log("🐾 Pets from DB:", rows); // Confirm what DB returns
    res.json(rows);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

/*app.get('/pets', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pet_adoption_1.pets');
    console.log("Fetched pets from DB:", rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching pets:', error.sqlMessage || error.message || error);
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});*/

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
