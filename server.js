// server.js

import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (re, res) => {
    return res.join("from backend server");
})

// Create a route to handle POST requests to add data to the database
app.post('/submit-form', (req, res) => {
    const { email, password, age, gender, delivery } = req.body;
    // Perform a SQL query to insert data into the database
    pool.query('INSERT INTO users (email, password, age, gender, delivery) VALUES (?, ?, ?, ?, ?)', [email, password, age, gender, delivery], (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL database:', err);
            res.status(500).json({ error: 'Failed to insert data into database' });
            return;
        }
        console.log('Data inserted into MySQL database');
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
