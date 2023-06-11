const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Require the CORS module
const app = express();
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL host
  user: 'LU001intouch_user', // Replace with your MySQL username
  password: 'iseveShare4rce.', // Replace with your MySQL password
  database: 'contacts_db' // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(express.json()); // Add this line to parse the request body as JSON
app.use(cors()); // Enable CORS for all routes

app.post('/contacts', (req, res) => {
  console.log(`${getTimeStamp()} POST /contacts`);
  const { name, email, phone } = req.body;
  const query = 'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)';
  connection.query(query, [name, email, phone], (err, results) => {
    if (err) {
      console.error('Error creating contact: ', err);
      res.status(500).json({ error: 'Error creating contact' });
      return;
    }
    res.status(201).json({ message: 'Contact created successfully' });
  });
});

app.get('/contacts', (req, res) => {
  console.log(`${getTimeStamp()} GET /contacts`);
  const query = 'SELECT * FROM contacts';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching contacts: ', err);
      res.status(500).json({ error: 'Error fetching contacts' });
      return;
    }
    res.status(200).json(results);
  });
});

app.put('/contacts/:id', (req, res) => {
  console.log(`${getTimeStamp()} PUT /contacts/:id`);
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const query = 'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?';
  connection.query(query, [name, email, phone, id], (err, results) => {
    if (err) {
      console.error('Error updating contact: ', err);
      res.status(500).json({ error: 'Error updating contact' });
      return;
    }
    res.status(200).json({ message: 'Contact updated successfully' });
  });
});

app.delete('/contacts/:id', (req, res) => {
  console.log(`${getTimeStamp()} DELETE /contacts/:id`);
  const { id } = req.params;
  const query = 'DELETE FROM contacts WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting contact: ', err);
      res.status(500).json({ error: 'Error deleting contact' });
      return;
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  });
});

const port = 3000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function getTimeStamp() {
  const currentDate = new Date();
  return currentDate.toISOString();
}







