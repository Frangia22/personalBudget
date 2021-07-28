var express = require('express');
var router = express.Router();
//Traigo las queries 
const api = require('../api');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Personal budget'});
});

module.exports = router;
