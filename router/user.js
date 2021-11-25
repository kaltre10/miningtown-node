const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');

route.put('/buygm',
    userController.buyGm
);

route.put('/buyship',
    userController.buyShip
);

route.get('/user/:wallet',
    userController.getData
    )

module.exports = route;