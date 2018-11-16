var express = require('express');
var BlogRepo = require('../repos/blogRepo')
var router = express.Router();
router.get('/',(req,res)=>{
    res.redirect('/blog/list');
})
router.get('/list',(req,res)=>{
    BlogRepo.All().then(r=>{
        BlogRepo.listNew().then(listNew=>{
            var vm = {
                listBlog: r,
                listNewBlog: listNew
            }
            res.render('blog/list',vm);
        })
    })
})

router.get('/detail',(req,res)=>{
    BlogRepo.Single(req.query.id).then(result=>{
        var vm = {
            Blog: result[0],
            layout: '_LayoutPublic'
        }
        res.render('blog/detail',vm);
    })
})
module.exports = router;
