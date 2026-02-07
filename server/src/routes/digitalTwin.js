const express = require('express');
const router = express.Router();
const digitalTwinController = require('../controllers/digitalTwinController');

router.post('/simulate', digitalTwinController.runSimulation);

module.exports = router;
