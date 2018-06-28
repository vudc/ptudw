var express = require('express');
var productRepo = require('../../repos/productRepo');
var categoryRepo = require('../../repos/categoryRepo');
var producerRepo = require('../../repos/producerRepo');
var router = express.Router();

router.get('/', (req, res) => {
    productRepo.loadAll().then(row => {
        var vm = {
            ListProduct: row,
            layout: '_LayoutAdmin'
        }
        res.render('../admin/views/Product/index', vm);
    });
});
router.get('/add', (req, res) => {
    producerRepo.LoadAll().then(producerList => {
        categoryRepo.loadAll().then(categoryList => {
            var vm = {
                listProducer: producerList,
                listCategory: categoryList,
                layout: '_LayoutAdmin'
            };
            res.render('../admin/views/product/add', vm);
        });
    }).catch(err => {
        res.redirect('/home/error');
    })

});

router.post('/add', (req, res) => {
    var product = {
        name: req.body.Name,
        discription: req.body.Discription,
        image: req.body.Image,
        categoryid: req.body.categoryID,
        producerid: req.body.producerID,
        price: req.body.Price,
        promotionprice: req.body.PromotionPrice,
        detail: req.body.Detail
    }
    console.log(product);
    productRepo.add(product).then(value => {
        res.redirect('/admin/product');
    }).catch(err => {
        res.end('fail');
    });
});

module.exports = router;