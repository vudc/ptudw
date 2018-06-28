var express = require('express');
var orderRepo = require('../../repos/orderRepo');
var check = require('../../repos/checkRepo');
var router = express.Router();

router.get('/',(req,res)=>{
    if (!check.isAdmin(req.session.User)){
        res.redirect('/account/login');
        return;
    }
    orderRepo.loadAllOrder().then(result =>{
        var vm = {
            layout: '_LayoutAdmin',
            listOrder: result,
        }
        res.render('../admin/views/order/index',vm);
    })
})

module.exports = router;