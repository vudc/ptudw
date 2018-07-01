var express = require('express');
var productRepo = require('../repos/productRepo');
var cartRepo = require('../repos/cartRepo');
var moment = require('moment');
var router = express.Router();
router.get('/', (req, res) => {
    if (!req.session.isLogged || (req.session.Cart === undefined)) {
        res.redirect('/account/login');
        return;
    }
    var CartDetail = [];
    for (var i = 0; i < req.session.Cart.length; i++) {
        var cartItem = req.session.Cart[i];
        var product = productRepo.SinglewithFull(cartItem.productID);
        CartDetail.push(product);
    }
    var Cart = [];
    Promise.all(CartDetail).then(result => {
        var total = 0;
        for (var i = result.length - 1; i >= 0; i--) {
            var product = result[i];
            var item = {
                product: product,
                quantity: req.session.Cart[i].quantity,
                amount: product.Price * req.session.Cart[i].quantity
            }
            total += item.amount;
            Cart.push(item);
        }
        var vm = {
            total: total,
            cartIsNull: (Cart.length === 0) ? true : false,
            cart: Cart
        }
        res.render('Cart/index', vm);
    }).catch(err=>{
        res.end('loi');
    });
});

//thêm mới 1 item vào giỏ hàng
router.post('/add', (req, res) => {
    var item = {
        productID: req.body.productID,
        quantity: +req.body.quantity
    }
    cartRepo.add(req.session.Cart, item);
    res.redirect('/Cart');
})

router.post('/removeall',(req,res)=>{
    cartRepo.removeAll(req.session.Cart);
    res.redirect('/Cart');
});

//xóa 1 item khỏi giỏ hàng
router.post('/remove',(req,res)=>{
    cartRepo.remove(req.session.Cart, req.body.productID);
    res.redirect(req.headers.referer);
});

router.get('/order',(req,res)=>{
    res.render('Cart/orderlist');
});

router.post('/payment',(req,res)=>{
    if (!req.session.isLogged || (req.session.Cart === undefined)) {
        res.redirect('/account/login');
        return;
    }
    var IsOverStock = false;
    productRepo.loadAll().then(rows=>{
        for (var i = 0;i< req.session.Cart.length;i++){
            for (var j = 0;j<rows.length;j++){
                if ((rows[j].Quantity < req.session.Cart[i].quantity) && (rows[j].ID == req.session.Cart[i].productID)){
                    IsOverStock = true;
                    return res.redirect('/Cart');
                }
            }
        }
        if (!IsOverStock){
            var timeNowMysql = moment().format('YYYY-MM-DD HH:mm:ss');
            cartRepo.SaveCart(req.session.Cart,req.session.User.ID,timeNowMysql).then(r =>{
                cartRepo.FindOrderIDbyCreateDate(timeNowMysql).then(result =>{
                    var OrderID = result[0].ID;
                    var ListOrderDetail = [];
                    ListUpdateQuantity = [];
                    for (var i = 0 ;i< req.session.Cart.length;i++){
                        var cartItem = req.session.Cart[i];
                        var updateQuantityItem = cartRepo.updateQuantity(cartItem.quantity, cartItem.productID);
                        var addCartDetail = cartRepo.SaveCartDetail(OrderID,cartItem);
                        ListOrderDetail.push(addCartDetail);
                        ListUpdateQuantity.push(updateQuantityItem);
                    }
                    Promise.all([ListOrderDetail,ListUpdateQuantity]).then(([r1,r2]) =>{
                        req.session.Cart.splice(0, req.session.Cart.length);
                        res.redirect('/home');
                    });
                 });    
            });
        }
    }).catch(err =>{
        res.end('loi thanh toan');
    })
});
module.exports = router;