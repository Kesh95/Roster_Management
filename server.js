const express = require('express');
const path = require('path');
const signupAuthRoutes = require('./routes/signup_auth');
const loginAuthRoutes = require('./routes/login_auth');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON data
app.use(express.json());

// Routes
app.use('/', signupAuthRoutes);
app.use('/', loginAuthRoutes);

// TL Dashboard route
app.get('/TLdashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'TLdashboard.html'));
});

// Engineer Dashboard route
app.get('/EngDashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'EngDashboard.html'));
});

// Check DB connection when server starts
db.getConnection()
  .then(conn => {
    console.log('✅ MySQL Database connected successfully!');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error connecting to MySQL Database:', err.message);
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
