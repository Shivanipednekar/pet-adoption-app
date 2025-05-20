const pool = require('C:\\Users\\SP\\Desktop\\Pet_adoption\\db\\db.js'); // adjust path to your db.js

async function testInsert() {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)',
      ['Test User 2', 'test2@example.com', 'testpass', 'Looking to Adopt']
    );
    console.log('Insert success:', result);
  } catch (err) {
    console.error('Insert error:', err);
  }
}

testInsert();
