const TLModel = require("../models/TLmodels");

exports.searchEngineerBytl = async (req, res) => {
  const olmid = req.params.olmid;
  console.log("Searching OLM ID:", olmid);
  try {
    const result = await TLModel.getUserByOlmIdforTl(olmid);
    if (result) {
      res.json(result); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error in searchEngineerBytl:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.setUserToResign = async (req, res) => {
  try {
    const { olmid } = req.params;
    await TLModel.updateUserStateToResign(olmid);
    res.status(200).json({ message: 'User marked as resigned.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status.' });
  }
};


exports.getAllEngineers = async (req, res) => {
  try {
    const [rows] = await TLModel.fetchAllEngineers();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching engineers:', error);
    res.status(500).json({ message: 'Failed to fetch engineer data' });
  }
};
