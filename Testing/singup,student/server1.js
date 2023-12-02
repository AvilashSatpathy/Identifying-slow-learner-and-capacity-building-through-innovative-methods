const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql'); // Use your database driver

const app = express();
const port = 3000; // Change to your desired port

// Parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection setup (adjust as needed)
const db = mysql.createConnection({
  host: 'your-database-host',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Define the API endpoint for storing student data
app.post('/api/store-student-data', (req, res) => {
  // Extract data from the request (adjust field names as needed)
  const { username, email, password } = req.body;

  // Insert data into the database (adjust SQL query)
  const sql = `INSERT INTO students (username, email, password) VALUES (?, ?, ?)`;
  const values = [username, email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log('Data inserted successfully');
      res.json({ success: true });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
