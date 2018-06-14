var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('Home/index');
});

router.get('/about', (req, res) => {
    res.render('Home/about');
});

module.exports = router;