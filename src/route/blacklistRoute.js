const express = require('express');
const router = express.Router();
const blacklistController = require('../controller/blacklistController');

//INSERT
router.post('/insert/:userId', blacklistController.insert)

//REMOVE
router.delete('/remove/:userId',  blacklistController.remove)

module.exports = router;