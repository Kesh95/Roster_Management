const express = require('express');
const router = express.Router();
const TLController = require('../controllers/TLcontroller');

router.get('/searchUser/:olmid', TLController.fetchUser);

module.exports = router;
