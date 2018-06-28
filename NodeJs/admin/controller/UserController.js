var express = require('express');
var userRepo = require('../../repos/accountRepo');
var router = express.Router();
var AdminLayout = '_LayoutAdmin';

router.get('/',(req,res)=>{
    userRepo.loadAll().then(result =>{
        var vm = {
            layout: AdminLayout,
            listUser: result
        }
        res.render('../admin/views/user/index',vm);
    }).catch(err=>{
        res.redirect('/home/error');
    })
})

module.exports = router;