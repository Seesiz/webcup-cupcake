var express = require('express');
const { getAllAnnonces, createPost, getListePropositionsParPost, proposerAnnonce } = require('../controllers/troc.controller');
var router = express.Router();

/* GET home page. */
router.get('/post', getAllAnnonces);

router.post('/post', createPost);

router.post('/post/propose', proposerAnnonce);

router.get('/post/:id', getListePropositionsParPost)

module.exports = router;
