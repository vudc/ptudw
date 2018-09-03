var express = require('express');
var router = express.Router();

//GET tạo mới bài viết
router.get('/add',(req,res)=>{
    var vm = {
        layout: '_LayoutAdmin'
    }
    res.render('../admin/views/blog/add', vm);
})

//
router.get('/',(req,res)=>{
    res.redirect('/admin/blog/index');
})
router.get('/index',(req,res)=>{
    var vm = {
        layout: '_LayoutAdmin',

    }
    res.render('../admin/views/blog/index',vm);
})
module.exports = router;