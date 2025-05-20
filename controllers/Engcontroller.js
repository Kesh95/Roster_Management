const EngModel = require('../models/Engmodels');

exports.fetchUser = async (req, res) => {
  const olmid = req.params.olmid;
  try {
    const result = await EngModel.findByOlmid(olmid);
    if(result){
      res.status(200).json({ message: 'Find successful!', data: result });
    }
    else{
      res.status(404).json({ message: 'User Not Found!' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.submitMultipleLeaves = async (req, res) => {
  const { olmId, leaveRequests } = req.body;

  if (!olmId || !Array.isArray(leaveRequests) || leaveRequests.length === 0) {
    return res.status(400).json({ message: 'Invalid request data.' });
  }

  try {
    const values = leaveRequests.map(leave => [
      olmId,
      leave.start,
      leave.end,
      leave.reason,
      'pending'
    ]);

    await EngModel.insertMultipleLeaves(values);
    console.log("Leave entries inserted successfully");

    res.status(200).json({ message: 'Leave requests submitted successfully.' });
  } catch (err) {
    console.error("Error submitting leaves:", err);
    res.status(500).json({ message: 'Server error while saving leaves.' });
  }
};
