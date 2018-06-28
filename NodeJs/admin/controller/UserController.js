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
router.get('/edit',(req,res)=>{
    userRepo.loadUser(req.query.id).then(result=>{
        var vm = {
            layout: AdminLayout,
            user: result[0]
        }
        console.log(result);
        res.render('../admin/views/user/edit',vm);
    }).catch(err =>{
        res.redirect('/home/error');
    })
})

router.post('/edit',(req,res)=>{
    var user = {
        id: req.body.ID,
        username: req.body.f_Username,
        password: req.body.f_Password,
        fullname: req.body.FullName,
        address: req.body.Address,
        phone: req.body.Phone,
        email: req.body.Email,
        dob: req.body.DoB,
        role:(req.body.Role === undefined) ?'Customer' : req.body.Role 
    }
    console.log(user);
    userRepo.AdminEdit(user).then(r =>{
        res.redirect('/admin/user');
    }).catch(err =>{
        res.redirect('/home/error');
    })
})

router.get('/delete',(req,res)=>{
    userRepo.loadUser(req.query.id).then(r=>{
        var vm = {
            user: r[0],
            layout: AdminLayout
        }
        res.render('../admin/views/user/delete',vm);
    }).catch(err=>{
        res.redirect('/home/error');
    })
})
router.post('/delete',(req,res)=>{
    userRepo.delete(req.body.userID).then(r=>{
        res.redirect('/admin/user');
    }).catch(err=>{
        res.redirect('/home/error');
    })
})
module.exports = router;