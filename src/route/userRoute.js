const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// READ ALL
router.get('/readAll', userController.readAll);

// READ BY ID
router.get('/read/:id', userController.readById);

//CREATE
router.post('/create', userController.createUser);

//UPDATE
router.put('/update/:id', userController.updateUser);

//DELETE
/*router.delete('/delete/:id',userController.deleteUser)*/

module.exports = router;
