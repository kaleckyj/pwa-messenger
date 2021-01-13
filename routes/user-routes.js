const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user-controller');

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);

module.exports = router;
