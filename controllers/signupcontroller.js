const signupModel = require('../models/signupmodels');

exports.signup = async (req, res) => {
  const { username, olmid, contact_no, gender, lob, team, role, pass } = req.body;

  if (!username || !olmid || !contact_no || !gender || !lob || !team || !role|| !pass) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    // Call insertUser with the provided data
    const result = await signupModel.insertUser({ username, olmid, contact_no, gender, lob, team,pass,role });
    res.status(200).json({ message: 'Signup successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'OLM id already exists!' });
  }
};
