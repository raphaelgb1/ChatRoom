const express = require('express');
const routes = express.Router();
const Controller = require('./controller/controllerIndex');

routes.get('/', Controller.index);

module.exports = routes;