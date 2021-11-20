const express = require('express');
const route = express.Router();
const authController = require('../controllers/authController');

route.post('/',
    authController.Auth
);

module.exports = route;