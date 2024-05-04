var express = require('express');
var router = express.Router();

var authentificationRouter = require('./authentification.routes');

router.use('/auth', authentificationRouter);

module.exports = router;


