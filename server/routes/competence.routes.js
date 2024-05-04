var express = require('express');
const { getCompetenceUser, getCompetenceRacine } = require('../controllers/competence.controller');
var router = express.Router();

/* GET home page. */
router.get('/', getCompetenceRacine);

router.get('/user/:id', getCompetenceUser);

module.exports = router;