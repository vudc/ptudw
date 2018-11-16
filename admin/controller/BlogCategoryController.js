var express = require('express');
var Blog_CategoryRepo = require('../../repos/Blog_CategoryRepo');
var router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/admin/blog_category/index');
})
router.get('/index', (req, res) => {
    Blog_CategoryRepo.All().then(result => {
        var vm = {
            List_BlogCategory: result,
            layout: '_LayoutAdmin',
        }
        res.render('../admin/views/blog_category/index', vm);
    })
    
})

//GET chỉnh sửa
router.get('/edit',(req,res)=>{
    Blog_CategoryRepo.Single(req.query.id).then(result=>{
        var vm = {
            blog_category: result[0],
            layout: '_LayoutAdmin'
        }
        res.render('../admin/views/blog_category/edit',vm);
    })
})


//GET thêm mới
router.get('/add',(req,res)=>{
    var vm = {
        layout: '_LayoutAdmin'
    }
    res.render('../admin/views/blog_category/add',vm);
})

router.post('/add',(req,res)=>{
    Blog_CategoryRepo.Add(req.body).then(r=>{
        res.redirect('/admin/blog_category');
    })
})

//POST Chỉnh sửa
router.post('/edit',(req,res)=>{
    Blog_CategoryRepo.Update(req.body).then(r=>{
        res.redirect('/admin/blog_category');
    })
})

router.get('/delete',(req,res)=>{
    var vm = {
        layout: '_LayoutAdmin'
    }
    res.render('../admin/views/blog_category/delete',vm);
})
module.exports = router;