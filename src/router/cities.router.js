const {Router} = require('express');
const { citySearch7, citySearch20 } = require('../controller/cities.controller');
const cityRouter = Router();

cityRouter.get("/cities/:query", citySearch7);

cityRouter.get("/search/:city", citySearch20);

module.exports = cityRouter;