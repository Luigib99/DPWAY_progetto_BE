const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// READ ALL
router.get('/readAll', userController.readAll);

// READ BY ID
router.get('/readUserById/:id', userController.readById);

//CREATE
router.post('/create', userController.createUser);

//UPDATE
router.put('/update/:id', userController.updateUser);
//username
router.put('/updateUsername/:id', userController.updateUsername)
//email
router.put('/updateEmail/:id', userController.updateEmail)
//password
router.post('/updatePassword/:id', userController.updatePassword)

//DELETE
router.delete('/delete/:id',userController.deleteUser)

module.exports = router;
