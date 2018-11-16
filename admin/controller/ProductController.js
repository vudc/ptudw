var express = require('express');
var check = require('../../repos/checkRepo');
var productRepo = require('../../repos/productRepo');
var categoryRepo = require('../../repos/categoryRepo');
var producerRepo = require('../../repos/producerRepo');
var router = express.Router();

router.get('/', (req, res) => {
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
    productRepo.loadAll().then(row => {
        var vm = {
            ListProduct: row,
            layout: '_LayoutAdmin'
        }
        res.render('../admin/views/Product/index', vm);
    });
});
router.get('/add', (req, res) => {
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
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
        discription: req.body.Discription.replace("\""," "),
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
    })
});

router.get('/edit', (req, res) => {
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
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

router.get('/delete',(req,res)=>{
    productRepo.single(req.query.id).then(r=>{
        var vm = {
            Product: r,
            layout: '_LayoutAdmin'
        }
        res.render('../admin/views/product/delete',vm);
    })
})

router.post('/delete',(req,res)=>{
    productRepo.delete(req.body.ID).then(r=>{
        console.log(req.body.ID);
        res.redirect('/admin/product');
    })
})
module.exports = router;