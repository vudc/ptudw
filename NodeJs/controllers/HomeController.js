var express = require('express');
var productRepo = require('../repos/productRepo');
var producerRepo = require('../repos/producerRepo');
var router = express.Router();

router.get('/', (req, res) => {
    productRepo.topnew().then(rows => {
        var vm = {
            listNewProduct: rows
        }
        res.render('Home/index',vm);
    }).catch(err =>{
        res.end('loi truy cap database');
    })
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