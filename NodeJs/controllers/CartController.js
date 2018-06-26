var express = require('express');
var productRepo = require('../repos/productRepo');
var cartRepo = require('../repos/cartRepo');

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
        for (var i = result.length - 1; i >= 0; i--) {
            var product = result[i];
            var item = {
                product: product,
                quantity: req.session.Cart[i].quantity,
                amount: product.Price * req.session.Cart[i].quantity
            }
            Cart.push(item);
        }
        var vm = {
            cartIsNull: (Cart.length === 0) ? true : false,
            cart: Cart
        }
        res.render('Cart/index', vm);
    });
});

router.post('/add', (req, res) => {
    console.log('ok');
    var item = {
        productID: req.body.productID,
        quantity: +req.body.quantity
    }
    cartRepo.add(req.session.Cart, item);
    res.redirect('/');
    console.log(req.session.Cart);
})
module.exports = router;