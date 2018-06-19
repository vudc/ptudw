var express = require('express');
var productRepo = require('../repos/productRepo');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('Home/index');
});

router.get('/about', (req, res) => {
    res.render('Home/about');
});
router.get('/product', (req, res) => {
    productRepo.SinglewithFull(req.query.id).then(c => {
        var vm = {
            Product: c,
            Layout: '_LayoutPublic'
        }
        res.render('Product/index',vm);
    });
});
module.exports = router;