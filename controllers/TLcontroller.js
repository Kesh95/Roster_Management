const TLModel = require('../models/TLmodels');

const fetchUser = (req, res) => {
    const olmid = req.params.olmid;
    console.log('Searching for OLM ID:', olmid); // Log the incoming OLM ID
  
    TLModel.getUserByOlm(olmid, (err, result) => {
      if (err) {
        console.error('Error fetching user:', err); // Log any error during the DB query
        return res.status(500).send('Server error');
      }
      console.log("Raw DB result:", result); 

      if (result.length === 0) {
        console.log('User not found for OLM ID:', olmid); // Log if no user is found
        return res.status(404).send('User not found');
      }
  
      console.log('User found:', result[0]); 
      res.json(result[0]);
    });
  };
  
module.exports = { fetchUser };
