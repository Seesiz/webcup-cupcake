const express = require('express');
const router = express.Router();

const authentificationRouter = require('./authentification.routes');
const competenceRouter = require('./competence.routes');
const trocRouter = require('./troc.routes');


router.use('/auth', authentificationRouter);
router.use('/skill', competenceRouter);
router.use('/troc', trocRouter);

module.exports = router;


