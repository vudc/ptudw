var express = require('express');
var productRepo = require('../repos/productRepo');
var cartRepo = require('../repos/cartRepo');

var router = express.Router();
router.get('/',(req,res)=>{
    if (req.session.isLogged || (req.session.Cart === undefined)){
        res.redirect('/account/login');
        return;
    }
    var CartDetail = [];
    for (var i = 0;i < req.session.Cart.length;i++){
        var cartItem = req.session.Cart[i];
        var product = productRepo.SinglewithFull(cartItem.productID);
        CartDetail.push(product);
    }
    Promise.all(CartDetail).then(result =>{
        console.log(result);
        for (var i = result.length;i>0;i--){
            
        }
    });
    res.redirect('/account/register');
});

router.post('/add',(req,res)=>{
    console.log('ok');
    var item = {
        productID: req.body.productID,
        quantity: +req.body.quantity
    }
    cartRepo.add(req.session.Cart,item);
    res.redirect('/');
})
module.exports = router;