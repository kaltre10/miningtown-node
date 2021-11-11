const express = require('express');
const route = express.Router();

route.post('/',
    authController.Login
);

module.exports = route;