const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');

route.put('/',
    userController.Update
);

module.exports = route;