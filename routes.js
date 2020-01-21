const {Router} = require('express');
const watson = require('./services/watson');

const routes = Router();

routes.post('/input',watson.generateSession);

module.exports = routes;