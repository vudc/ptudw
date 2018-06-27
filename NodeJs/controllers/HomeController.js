var express = require('express');
var productRepo = require('../repos/productRepo');
var producerRepo = require('../repos/producerRepo');
var router = express.Router();
var config = require('../config/config');
router.get('/search', (req, res) => {
    res.render('Home/search');
});

router.get('/producer/:producerID', (req, res) => {
    var producerID = req.params.producerID;
    var page = req.query.page;
    if (!page) { page = 1; }
    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;
    var p1 = productRepo.loadByCategoryPagination(producerID, offset);
    var p2 = productRepo.countByCategoryID(producerID);

    //promise tránh trường hợp callback
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        var totalProduct = countRows[0].totalProduct;
        var nPages = totalProduct / config.PRODUCTS_PER_PAGE;
        console.log(nPages);
        if (totalProduct % config.PRODUCTS_PER_PAGE) { nPages++; }
        console.log(nPages);
        var numbers = [];
        for (var i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurrentPage: i === +page
            });
        }
        var vm = {
            products: pRows,
            noProducts: pRows.length === 0,
            producerName: (pRows.length !== 0) ? pRows[0].producerName : '',
            page_number: numbers
        }
        console.log(vm);
        res.render('Product/producer', vm);
    });
});

router.get('/category/:categoryID', (req, res) => {
    var categoryID = req.params.categoryID;
    var page = req.query.page;
    if (!page) { page = 1; }
    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;
    console.log(offset);
    var p1 = productRepo.loadByCategoryPagination(categoryID, offset);
    var p2 = productRepo.countByCategoryID(categoryID);

    //promise tránh trường hợp callback
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        var totalProduct = countRows[0].totalProduct;
        var nPages = totalProduct / config.PRODUCTS_PER_PAGE;
        if (totalProduct % config.PRODUCTS_PER_PAGE) { nPages++; }
        var numbers = [];
        for (var i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurrentPage: i === +page
            });
        }
        var vm = {
            products: pRows,
            noProducts: pRows.length === 0,
            categoryName: (pRows.length !== 0) ? pRows[0].categoryName : '',
            page_number: numbers
        }
        res.render('Product/category', vm);
    });
});

router.post('/search', (req, res) => {
    var searchContent = {
        searchString: req.body.searchString,
        searchType: req.body.searchType
    }
    productRepo.FindProduct(searchContent).then(rows => {
        var ExsitProduct = true;
        if (rows.length == 0) {
            ExsitProduct = false;
        }
        var vm = {
            ExsitProduct: ExsitProduct,
            listProduct: rows
        }
        console.log(vm.listProduct);
        res.render('Home/searchResult', vm);
    });
});

router.get('/', (req, res) => {
    var listMostViewProduct = {};
    var listMostSellProduct = {};
    productRepo.topsell().then(rows => {
        listMostSellProduct = rows;
    }).catch(err => {
        res.end('loi truy cap top sell');
    });
    productRepo.topview().then(rows => {
        listMostViewProduct = rows;
    }).catch(err => {
        res.end('loi doc danh sach top vieww');
    })
    productRepo.topnew().then(rows => {
        var vm = {
            listNewProduct: rows,
            listSellProduct: listMostSellProduct,
            listViewProduct: listMostViewProduct
        }
        res.render('Home/index', vm);
    }).catch(err => {
        res.end('loi truy cap database');
    })
});

router.get('/about', (req, res) => {
    res.render('Home/about');
});

router.get('/error',(req,res)=>{
    res.render('Home/error');
})

router.get('/product', (req, res) => {
    productRepo.AddView(1, req.query.id);
    var orderCategoryList = {};
    var orderProducerList = {};
    var p1 = productRepo.loadOrderCategory(req.query.id);
    var p2 = productRepo.loadOrderProducer(req.query.id);
    var p3 = productRepo.SinglewithFull(req.query.id);
    Promise.all([p1, p2, p3]).then(([orderCategoryList, orderProducerList, product]) => {
        var vm = {
            orderCategoryList: orderCategoryList,
            orderProducerList: orderProducerList,
            Product: product,
            Layout: '_LayoutPublic'
        }
        res.render('Product/index', vm);
    })
});
module.exports = router;