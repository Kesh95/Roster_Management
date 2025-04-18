const loginModel = require('../models/loginmodels');

exports.login = async (req, res) => {
  const { olmid, pass } = req.body;

  console.log("Received OLM ID:", olmid);
  console.log("Received Password:", pass);

  if (!olmid || !pass) {
    return res.status(400).json({ message: 'Both OLM ID and password are required!' });
  }

  try {
    console.log("🔍 Looking up user for OLM ID:", olmid);
    const user = await loginModel.getUserByOlmId(olmid);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    if (user.pass !== pass) {
      return res.status(401).json({ message: 'Invalid password!' });
    }
    console.log("User role is:", user.role);

    if (user.role === 'TL') {
      return res.status(200).json({ redirect: '/TLdashboard' });
    } else if (user.role === 'Eng') {
      return res.status(200).json({ redirect: '/EngDashboard' });
    } else {
      return res.status(400).json({ message: 'Invalid role!' });
    }

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Internal server error!' });
  }
};
