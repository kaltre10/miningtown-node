const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const planetController = require('../controllers/planetController')
route.put('/buygm',
    userController.buyGm
);

route.put('/buyship',
    userController.buyShip
);

route.get('/user/:wallet',
    userController.getData
);

route.put('/mine',
    planetController.mine
);

route.put('/unlockPlanet',
    planetController.unlockPlanet
);



module.exports = route;