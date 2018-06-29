var express = require('express');
var orderRepo = require('../../repos/orderRepo');
var moment = require('moment');
var check = require('../../repos/checkRepo');
var userRepo = require('../../repos/accountRepo')
var router = express.Router();

router.get('/', (req, res) => {
    if (!check.isAdmin(req.session.User)) {
        res.redirect('/account/login');
        return;
    }
    orderRepo.loadAllOrder().then(result => {
        for( var i = 0;i<result.length;i++){
            result[i].orderCreateDate = moment(result[i].orderCreateDate,'YYYY-MM-DD HH:mm:ss').format('D/M/YYYY');
        }
        var vm = {
            layout: '_LayoutAdmin',
            listOrder: result,
        }
        res.render('../admin/views/order/index', vm);
    })
})
router.get('/edit', (req, res) => {
    orderRepo.single(req.query.id).then(r => {
        r[0].CreateDate = moment(r[0].CreateDate,'YYYY-MM-DD HH:mm:ss').format('D/M/YYYY');
        var vm = {
            order: r[0],
            layout: '_LayoutAdmin'
        }
        res.render('../admin/views/order/edit', vm);
    }).catch(err => {
        res.redirect('/home/error');
    })
})
router.post('/edit',(req,res)=>{
    var order = {
        id : req.body.ID,
        userid: req.body.UserID,
        status: req.body.Status,
        createdate: moment(req.body.CreateDate,'D/M/YYYY').format('YYYY-MM-DD HH:mm:ss'),
    }
    orderRepo.adminEdit(order).then(r =>{
        res.redirect('/admin/order');
    }).catch(err=>{
        res.redirect('/home/error');
    })
})
module.exports = router;