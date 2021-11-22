const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');

route.post('/',
    userController.Update
);

route.get('/:wallet',
    userController.getData
    )

module.exports = route;