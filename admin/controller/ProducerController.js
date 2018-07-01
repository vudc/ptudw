var producerRepo = require('../../repos/producerRepo');
var express = require('express');
var check = require('../../repos/checkRepo');
var router = express.Router();
var AdminLayout = '_LayoutAdmin';
router.get('/add',(req,res)=>{
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
    var vm = {
        layout: AdminLayout
    }
    res.render('../admin/views/producer/add',vm);
});

router.get('/',(req,res)=>{
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
    producerRepo.LoadAll().then(results=>{
        var vm = {
            listProducer: results,
            layout: AdminLayout
        }
        res.render('../admin/views/producer/index',vm);
    })
    
});

router.get('/edit',(req,res)=>{
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
    producerRepo.single(req.query.id).then(result =>{
        var vm = {
            layout: AdminLayout,
            producer: result[0]
        }
        res.render('../admin/views/producer/edit',vm);
    }).catch(err =>{
        res.redirect('/home/error');
    });
});

router.get('/delete',(req,res)=>{
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
    producerRepo.single(req.query.id).then(result=>{
        var vm = {
            layout:AdminLayout,
            producer: result[0]
        }
        res.render('../admin/views/producer/delete',vm);
    }).catch(err =>{
        res.redirect('/home/error');
    });
});

router.post('/delete',(req,res)=>{
    producerRepo.delete(req.body.producerID).then(r =>{
        res.redirect('/admin/producer');
    });
});

router.post('/edit',(req,res)=>{
    var producer = {
        id: req.body.producerID,
        name:req.body.producerName,
        address: req.body.producerAddress,
        phone: req.body.producerPhone,
        email: req.body.producerEmail,
        website: req.body.producerWebsite
    }
    producerRepo.edit(producer).then(result =>{
        res.redirect('/admin/producer');
    })
})

router.post('/add',(req,res)=>{
    var producer = {
        name:req.body.producerName,
        address: req.body.producerAddress,
        phone: req.body.producerPhone,
        email: req.body.producerEmail,
        website: req.body.producerWebsite
    }
    producerRepo.add(producer).then(row =>{
        var vm = {
            layout: AdminLayout,
            showAlert: true
        }
        res.render('../admin/views/producer/add',vm);
    })
});
module.exports = router;