const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    
    const { fullName, email, password, confirmPassword } = req.body;
    
    if (!fullName || !email || !password || !confirmPassword) {
      console.log('Missing required fields:', { fullName, email, password: !!password, confirmPassword: !!confirmPassword });
      return res.status(400).send('All fields are required');
    }

    // Validate password match
    if (password !== confirmPassword) {
      console.log('Password mismatch');
      return res.status(400).send('Passwords do not match');
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    console.log('Attempting database insert for:', { fullName, email });
    const sql = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
    await db.execute(sql, [fullName, email, hash]);
    
    console.log('User registered successfully');
    res.status(200).send('User registered successfully');
  } catch (err) {
    console.error('Signup error details:', {
      message: err.message,
      code: err.code,
      sqlMessage: err.sqlMessage,
      stack: err.stack
    });
    
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).send('Email already registered');
    } else {
      res.status(500).send('Registration failed: ' + err.message);
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(sql, [email]);
    
    if (rows.length === 0) {
      return res.status(401).send('User not found');
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      return res.status(401).send('Invalid credentials');
    }
    
    res.status(200).send('Login successful');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Login failed');
  }
};
