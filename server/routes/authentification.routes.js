var express = require('express');
const { authentifierUser, registerUser} = require('../controllers/authentification.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', authentifierUser);
router.post('/register', registerUser);

module.exports = router;
