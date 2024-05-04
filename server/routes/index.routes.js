var express = require('express');
var router = express.Router();

var authentificationRouter = require('./authentification.routes');
var competenceRouter = require('./competence.routes');


router.use('/auth', authentificationRouter);
router.use('/skill', competenceRouter);

module.exports = router;


