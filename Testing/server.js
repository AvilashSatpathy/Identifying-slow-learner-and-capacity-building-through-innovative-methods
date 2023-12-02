const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Configure MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle POST request for signup
app.post('/signup', (req, res) => {
    const { username, email, password, email_address, phone_number } = req.body;

    // Insert user data into the "users" table
    const insertUserQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.query(insertUserQuery, [username, email, password], (err, userResult) => {
        if (err) {
            console.error('Error inserting user data: ' + err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Retrieve the inserted user's ID
        const userId = userResult.insertId;

        // Insert parents' data into the "parents" table
        const insertParentsQuery = `INSERT INTO parents (user_id, email_address, phone_number) VALUES (?, ?, ?)`;
        db.query(insertParentsQuery, [userId, email_address, phone_number], (err) => {
            if (err) {
                console.error('Error inserting parents data: ' + err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Insert user data into the "students" table
            const insertStudentQuery = `INSERT INTO students (username, email, password) VALUES (?, ?, ?)`;
            db.query(insertStudentQuery, [username, email, password], (err) => {
                if (err) {
                    console.error('Error inserting student data: ' + err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // Successful signup
                res.status(200).json({ message: 'Signup successful' });
            });
        });
    });
});

// Handle POST request for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query the "students" table to check if the username and password match
    const loginQuery = 'SELECT * FROM students WHERE username = ? AND password = ?';
    db.query(loginQuery, [username, password], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 1) {
            // User is authenticated; perform necessary actions
            // For example, return a success response
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Invalid credentials; return an error response
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Define a route to handle the POST request to store quiz results
app.post('/api/store-results', (req, res) => {
    const quizResults = req.body; // Assuming the scores are sent as JSON data
    
    // Insert quizResults into the "results" table
    const insertResultsQuery = `INSERT INTO results (quiz_name, score, student_id) VALUES (?, ?, ?)`;
    db.query(insertResultsQuery, [quizResults.quizName, quizResults.score, quizResults.studentId], (err, result) => {
        if (err) {
            console.error('Error inserting quiz results: ' + err);
            return res.status(500).json({ error: 'Failed to insert quiz results' });
        }

        // Respond with a success message
        res.json({ success: true });
    });
});

// Define a route to handle the GET request to fetch data from the database
app.get('/api/fetch-results', (req, res) => {
    // Query the "results" table to retrieve quiz results
    db.query('SELECT * FROM results', (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }

        res.json(result); // Send the data as JSON response
    });
});

// Define a route to handle the GET request to check slow learners
app.get('/api/check-results', (req, res) => {
    // Query the "results" table to identify slow learners
    db.query('SELECT * FROM results', (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }

        // Process the fetched data and apply conditions to identify slow learners
        const slowLearners = result.filter((row) => {
            return row.aptitude <= 2 || row.mathematics <= 2 || row.programming <= 2;
        });

        if (slowLearners.length > 0) {
            const insertQuery = `INSERT INTO slow_learners (mail) VALUES ?`;
            const values = slowLearners.map((row) => [row.mail]);

            db.query(insertQuery, [values], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Error inserting slow learners:', insertErr);
                    return res.status(500).json({ error: 'Failed to insert slow learners' });
                }

                console.log(`${slowLearners.length} slow learners inserted into 'slow_learners' table.`);
                // Respond with a success message or data if needed
                res.json({ success: true, slowLearners });
            });
        } else {
            // If no slow learners were found, respond accordingly
            res.json({ success: true, slowLearners: [] });
        }
    });
});

// Start the server
const port = 3000; // Change to your desired port number
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
