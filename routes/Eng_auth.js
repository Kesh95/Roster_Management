const express = require('express');
const router = express.Router();
const EngController = require('../controllers/Engcontroller');

router.get('/getLoggedInOlmId', (req, res) => {
    if (req.session.olmid) {
      res.json({ olmid: req.session.olmid });
    } else {
      res.status(401).json({ error: 'Not logged in' });
    }
  });  




router.get('/search-user/:olmid', EngController.fetchUser);
router.post('/leavedata',EngController.leavedata);

module.exports = router;
