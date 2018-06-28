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
        res.redirect('/home/error');
    });
});

router.get('/edit', (req, res) => {
    productRepo.single(req.query.id).then(product => {
        var p1 = producerRepo.LoadAll();
        var p2 = categoryRepo.loadAll();
        Promise.all([p1, p2]).then(([r1, r2]) => {
            var vm = {
                product: product,
                listProducer: r1,
                layout: '_LayoutAdmin',
                listCategory: r2
            }
            res.render('../admin/views/product/edit', vm);
        });
    }).catch(err => {
        res.redirect('/home/error');
    })
});
router.post('/edit', (req, res) => {
    var product = {
        id: req.body.productID,
        name: req.body.Name,
        discription: req.body.Discription,
        image: req.body.Image,
        categoryid: req.body.categoryID,
        producerid: req.body.producerID,
        price: req.body.Price,
        promotionprice: req.body.PromotionPrice,
        detail: req.body.Detail
    }
    productRepo.edit(product).then(r => {
        res.redirect('/admin/product');
    }).catch(err => {
        redirect('/home/error');
    })
})
module.exports = router;