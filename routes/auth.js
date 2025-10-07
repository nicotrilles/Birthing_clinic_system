const express = require('express');
const router = express.Router();
const db = require('../models/db'); // your MySQL connection
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert into birthing_clients
    const sql = 'INSERT INTO birthing_clients (full_name, email, password) VALUES (?, ?, ?)';
    const values = [full_name, email, hashedPassword];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).send('Error creating account');
      }
      res.send('🎉 Account created successfully!');
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
