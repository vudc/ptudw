var express = require('express');
var orderRepo = require('../../repos/orderRepo');
var router = express.Router();

router.get('/',(req,res)=>{
    orderRepo.loadAllOrder().then(result =>{
        var vm = {
            layout: '_LayoutAdmin',
            listOrder: result,
        }
        res.render('../admin/views/order/index',vm);
    })
})

module.exports = router;