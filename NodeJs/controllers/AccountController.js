var express = require('express'),
    moment = require('moment');
var config = require('../config/config');
var accountRepo = require('../repos/accountRepo');
var cartRepo = require('../repos/cartRepo');
var productRepo = require('../repos/productRepo');
var router = express.Router();
router.get('/login', (req, res) => {
    var vm = {
        layout: false
    }
    res.render('account/login', vm);
});

router.get('/edit', (req, res) => {
    if ((req.session.isLogged === false) || (req.session.User.ID != req.query.id)) {
        res.redirect('/error');
        return;
    }
    accountRepo.loadUser(req.query.id).then(result => {
        var vm = {
            user: result[0],
        }
        res.render('account/edit', vm);
    }).catch(err => {
        res.end('loi');
    });
});
router.post('/edit', (req, res) => {
    var User = {
        id: req.body.userID,
        fullname: req.body.FullName,
        email: req.body.Email,
        address: req.body.Address,
        dob: req.body.DoB
    }
    accountRepo.edit(User).then(r => {
        res.redirect('/account/profile');
    });
})
router.get('/profile', (req, res) => {
    if ((req.session.isLogged === false)||(req.session.User === undefined)) {
        res.redirect('/account/login');
        return;
    }

    var p2 = cartRepo.loadAllOrderByUserID(req.session.User.ID);
    var p1 = accountRepo.loadUser(req.session.User.ID);
    Promise.all([p1, p2]).then(([r1, r2]) => {
        for (var i = 0; i < r2.length; i++) {
            r2[i].CreateDate = moment(r2[i].CreateDate, 'YYYY-MM-DD HH:mm:ss').format('D/M/YYYY');
        }
        var vm = {
            user: r1[0],
            order: r2,

        }
        console.log(r2)
        res.render('account/profile', vm);
    }).catch(err => {
        res.end('loi');
    });
});
router.post('/login', (req, res) => {
    var User = {
        username: req.body.Username,
        password: req.body.Password
    };
    console.log(User);
    accountRepo.login(User).then(rows => {
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.User = rows[0];
            req.session.Cart = [];
            var url = '/';
            res.redirect('/');
        }
        else {
            var vm = {
                showError: true,
                errorMsg: 'Sai tài khoản hoặc mật khẩu.',
                layout: false
            };
            res.render('account/login', vm);
        }
    });
});

router.get('/register', (req, res) => {
    var vm = {
        layout: false
    }
    res.render('account/register', vm);
});

router.post('/register', (req, res) => {
    var doB = moment(req.body.DoB, 'D/M/YYYY').format('D/M/YYYY');
    const secretKey = "6LifdWAUAAAAAG1OTkOEfz8wRr1BOqMBAS6TGTDc";
    const veryfyURL = `https://google.com/recapcha/api/siteverify?secret=${secretKey}
    &response=${req.body.capcha}&removeip=${req.connection.remoteAddress}`;

    accountRepo.isUserExsits(req.body.Username).then(rows => {
        if (rows.length > 0) {
            var vm = {
                layout: false,
                SHOWMESSAGE_isUserExsits: true,
                MESSAGE_isUserExsits: 'Tài khoản đã tồn tại'

            }
            console.log(vm);
            res.render('account/register', vm);
        } else {
            var User = {
                username: req.body.Username,
                password: req.body.Password,
                fullname: req.body.Fullname,
                address: req.body.Address,
                email: req.body.Email,
                dob: doB,
                role: 'Customer',
                permisson: 0
            }
            accountRepo.add(User).then(value => {
                var vm = {
                    layout: false,
                    SHOWMESSAGE_success: true,
                    MESSAGE_success: 'Đang ký thành công!'
                }
                res.render('account/register', vm);
            }).catch(err => {
                res.end('fail');
            });;
        }
    }).catch(err => {
        res.end('fail');
    });
});

router.get('/order', (req, res) => {
    var orderID = req.query.id;
    var listProductReq = [];
    cartRepo.LoadOrderDetail(orderID).then(listOrderDetail => {
        for (var i = 0; i < listOrderDetail.length; i++) {
            var product = productRepo.SinglewithFull(listOrderDetail[i].ProductID);
            listProductReq.push(product);
        }
        Promise.all(listProductReq).then(result => {
            var ListProduct = [];
            for (var i = 0; i < result.length; i++) {
                result[i].CreateDate = moment(result[i].CreateDate, 'YYYY-MM-DD HH:mm:ss').format('D/M/YYYY');
                var quantity = 0;
                for(var j =0;j<listOrderDetail.length;j++){
                    if (listOrderDetail[j].ProductID === result[i].ID){
                        quantity = listOrderDetail[i].Quantity;
                    }
                }
                var orderItem = {
                    quantity: quantity,
                    amount: quantity * result[i].Price,
                    product: result[i]
                }
                ListProduct.push(orderItem);
            }
            var vm = {
                listProduct: ListProduct
            }
            res.render('account/order',vm);
        })
    })

})

router.post('/logout', (req, res) => {
    req.session.isLogged = false;
    req.session.user = null;
    req.session.cart = [];
    res.redirect(req.headers.referer);
});

module.exports = router;