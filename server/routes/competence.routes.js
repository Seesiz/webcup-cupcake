var express = require('express');
const { getCompetenceUser, getCompetenceRacine, debloquerCompetence } = require('../controllers/competence.controller');
var router = express.Router();

/* GET home page. */
router.get('/', getCompetenceRacine);

router.get('/user/:id', getCompetenceUser);

// router.post('/unlock', debloquerCompetence);

module.exports = router;
