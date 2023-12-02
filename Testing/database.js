const { createPool } = require('mysql');
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "students",
    connectionLimit: 10
});

// Perform the initial query
pool.query(`SELECT * FROM results WHERE aptitude <= 2 OR mathematics <= 2 OR programming <= 2`, [], (err, result, fields) => {
    if (err) {
        return console.log(err);
    }

    // Identify slow learners and insert their email addresses into 'slow_learners'
    const slowLearners = result;

    if (slowLearners.length > 0) {
        const insertQuery = `INSERT INTO slow_learners (email) VALUES ?`;
        const values = slowLearners.map(row => [row.mail]);

        pool.query(insertQuery, [values], (insertErr, insertResult) => {
            if (insertErr) {
                return console.log(insertErr);
            }
            console.log(`${slowLearners.length} slow learners inserted into 'slow_learners' table.`);
        });
    }
});

module.exports = pool;
