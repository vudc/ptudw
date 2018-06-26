var express = require('express'),
    moment = require('moment');
var accountRepo = require('../repos/accountRepo');
var router = express.Router();
router.get('/login', (req, res) => {
    var vm = {
        layout: false
    }
    res.render('account/login', vm);
});

router.get('/profile', (req, res) => {
    if (req.session.isLogged === false) {
        res.redirect('/error');
    }
    res.render('account/profile');
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
    var doB = moment(req.body.DoB, 'D/M/YYYY').format('YYYY-MM-DDTHH:mm');
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
                res.render('account/register',vm);
            }).catch(err => {
                res.end('fail');
            });;
        }
    }).catch(err =>{
        res.end('fail');
    });
});

router.post('/logout', (req, res) => {
    req.session.isLogged = false;
    req.session.user = null;
    req.session.cart = [];
    res.redirect(req.headers.referer);
});

module.exports = router;