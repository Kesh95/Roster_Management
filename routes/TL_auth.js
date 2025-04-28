const express = require('express');
const router = express.Router();
const TLController = require('../controllers/TLcontroller');

router.get('/getLoggedInOlmId', (req, res) => {
    if (req.session.olmid) {
      res.json({ olmId: req.session.olmid });
    } else {
      res.status(401).json({ error: 'Not logged in' });
    }
  });  

router.get("/search-user/:olmid", TLController.searchUser);

module.exports = router;
