var express = require('express');
var productRepo = require('../repos/productRepo');
var router = express.Router();

router.get('/', (req, res) => {
    productRepo.loadAll().then(row => {
        var vm = {
            ListProduct: row,
            layout: '_LayoutAdmin'
        }
        res.render('../admin/views/product/index', vm);
    });
});
router.get('/add', (req, res) => {
    var vm = {
        showAlert: false,
        layout: '_LayoutAdmin'
    };
    res.render('../admin/views/product/add', vm);
});

router.post('/add', (req, res) => {
    productRepo.add(req.body).then(value => {
        var vm = {
            showAlert: true,
            layout: '_LayoutAdmin'
        };
        res.render('../admin/views/product/add', vm);
    }).catch(err => {
        res.end('fail');
    });
});

module.exports = router;