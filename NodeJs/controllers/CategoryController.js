var express = require('express');
var categoryRepo = require('../repos/categoryRepo');
var router = express.Router();


router.get('/', (req, res) => {
    categoryRepo.loadAll().then(rows => {
        var vm = {
            categories: rows,
            layout: '_LayoutAdmin'
        };
        res.render('admin/Category/index', vm);
    });
});

module.exports = router;