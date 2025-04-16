const express = require('express');
const router = express.Router();
const roleController = require ('../controller/roleController')

//READ ALL
router.get('/readAll', roleController.readAll);

module.exports = router;