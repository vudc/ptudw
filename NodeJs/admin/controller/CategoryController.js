var express = require('express');
var categoryRepo = require('../../repos/categoryRepo');
var check = require('../../repos/checkRepo');
var router = express.Router();

//Load danh sách các danh mục
router.get('/', (req, res) => {
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
    categoryRepo.loadAll().then(rows => {
        var vm = {
            Listcategories: rows,
            layout: '_LayoutAdmin'
        };
        res.render('../admin/views/category/index', vm);
    });
});

//Http GET -> thêm danh mục
router.get('/add', (req, res) => {
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
    var vm = {
        showAlert: false,
        layout: '_LayoutAdmin'
    };
    res.render('../admin/views/category/add', vm);
});

//Http Post -> thêm danh mục
router.post('/add', (req, res) => {
    categoryRepo.add(req.body).then(value => {
        var vm = {
            showAlert: true,
            layout: '_LayoutAdmin'
        };
        res.render('../admin/views/category/add', vm);
    }).catch(err => {
        res.end('fail');
    });
});

//Http Get-> Xóa 1 danh mục
router.get('/delete', (req, res) => {
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
    categoryRepo.single(req.query.id).then(c => {
        var vm = {
            Category: c,
            layout: '_LayoutAdmin'
        };
        res.render('../admin/views/category/delete', vm);
    });
});


//http Post -> Xóa danh mục
router.post('/delete', (req, res) => {
    categoryRepo.delete(req.body.categoryID).then(value => {
        res.redirect('/admin/Category');
    }).catch(err =>{
        res.redirect('/home/error');
    });
});

router.get('/edit', (req, res) => {
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
    categoryRepo.single(req.query.id).then(c => {
    	console.log(c);
        var vm = {
            Category: c,
            layout: '_LayoutAdmin'
        };
        res.render('../admin/views/category/edit', vm);
    });
});

router.post('/edit', (req, res) => {
    console.log(req.body);
    categoryRepo.update(req.body).then(value => {
        var vm = {
            layout: '_LayoutAdmin'
        }
        res.redirect('/admin/category');
    });
});

module.exports = router;