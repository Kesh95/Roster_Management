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

exports.leavedata = async (req, res) => {
  const {olmid,startdate, enddate,reason,status } = req.body;

  try {
    const result = await EngModel.addleaveUser({olmid, startdate,enddate,reason,status });
    res.status(200).json({ message: 'Data Saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error Occured!' });
  }
};
