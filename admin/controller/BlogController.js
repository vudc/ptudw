var express = require('express');
var BlogRepo = require('../../repos/blogRepo');
var BlogCategoryRepo = require('../../repos/Blog_CategoryRepo');
var router = express.Router();

//GET tạo mới bài viết
router.get('/add',(req,res)=>{
    BlogCategoryRepo.All().then(result=>{
        var vm = {
            listBlogCategory: result,
            layout: '_LayoutAdmin'
        }
        res.render('../admin/views/blog/add', vm);
    })
    
})
router.post('/add',(req,res)=>{
    BlogRepo.add(req.body).then(r=>{
        res.redirect('/admin/blog');
    })
})
//
router.get('/',(req,res)=>{
    res.redirect('/admin/blog/index');
})
router.get('/index',(req,res)=>{
    BlogRepo.All().then(result=>{
        var vm = {
            layout: '_LayoutAdmin',
            listBlog: result
        }
        console.log(vm)
        res.render('../admin/views/blog/index',vm);
    })
})

router.get('/edit',(req,res)=>{
    BlogRepo.Single(req.query.id).then(r=>{
        BlogCategoryRepo.All().then(listBlogCat=>{
            var vm = {
                layout: '_LayoutAdmin',
                Blog: r[0],
                listBlogCategory: listBlogCat
            }
            res.render('../admin/views/blog/edit',vm);
        })
    })
})
router.post('/edit',(req,res)=>{
    BlogRepo.edit(req.body).then(r=>{
        res.redirect('/admin/blog');
    })
})

router.get('/delete',(req,res)=>{
    BlogRepo.Single(req.query.id).then(r=>{
        var vm = {
            Blog: r[0],
            layout: '_LayoutAdmin'
        }
        res.render('../admin/views/blog/delete',vm);
    })
})
router.post('/delete',(req,res)=>{
    BlogRepo.delete(req.body.ID).then(r=>{
        res.redirect('/admin/blog');
    })
})
module.exports = router;