const express = require('express');
const router = express.Router();
const roleController = require ('../controller/roleController')

router.get('/readAll', roleController.readAll);

module.exports = router;