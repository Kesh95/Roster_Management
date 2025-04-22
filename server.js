const express = require('express');
const path = require('path');
const signupAuthRoutes = require('./routes/signup_auth');
const loginAuthRoutes = require('./routes/login_auth');
const TLRoute = require('./routes/TL_auth');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Routes
app.use('/', signupAuthRoutes);
app.use('/', loginAuthRoutes);
app.use('/', TLRoute);
app.get('/TLdashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'TLdashboard.html'));
});

app.get('/EngDashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'EngDashboard.html'));
});

app.get('/TLdashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'TLdashboard.html'));
});

 
db.getConnection()
  .then(conn => {
    console.log('✅ MySQL Database connected successfully!');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error connecting to MySQL Database:', err.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
