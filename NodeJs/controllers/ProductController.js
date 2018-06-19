var express = require('express');
var linq = require('linq');
var productRepo = require('../repos/productRepo');
var router = express.Router();

router.get('/', (req, res) => {
    productRepo.loadAll().then(row => {
        var vm = {
            ListProduct: row,
            layout: '_LayoutAdmin'
        }
        res.render('admin/Product/index', vm);
    });
});
router.get('/add', (req, res) => {
    var vm = {
        showAlert: false,
        layout: '_LayoutAdmin'
    };
    res.render('admin/Product/add', vm);
});

router.post('/add', (req, res) => {
    productRepo.add(req.body).then(value => {
        var vm = {
            showAlert: true,
            layout: '_LayoutAdmin'
        };
        res.render('admin/Product/add', vm);
    }).catch(err => {
        res.end('fail');
    });
});

module.exports = router;