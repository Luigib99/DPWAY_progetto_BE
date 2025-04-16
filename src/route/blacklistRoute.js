const express = require('express');
const router = express.Router();
const blacklistController = require('../controller/blacklistController');
const middleware = require('../utils/midlleware');

// INSERT
router.post('/insert/:executorId/:userId', middleware.verifyAdmin, blacklistController.insert);

// REMOVE
router.delete('/remove/:executorId/:userId', middleware.verifyAdmin, blacklistController.remove);

module.exports = router;