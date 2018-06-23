var express = require('express'),
    moment = require('moment');
var accountRepo = require('../repos/accountRepo');
var router = express.Router();
router.get('/login', (req, res) => {
    var vm = {
        layout: false
    }
    res.render('account/login',vm);
});

router.get('/profile',  (req, res) => {
    res.render('account/profile');
});
router.post('/login',(req,res)=>{
    var User = {
        username: req.body.Username,
        password: req.body.Password
    };
    console.log(User);
    accountRepo.login(User).then(rows => {
        if (rows.length > 0){
            req.session.isLogged = true;
            req.session.User = rows[0];
            var url = '/';
            res.redirect('/');
        }
        else {
            var vm = {
                showError: true,
                errorMsg: 'Sai tài khoản hoặc mật khẩu.',
                layout: false
            };
            res.render('account/login',vm);
        }
    });
});

router.get('/register', (req, res)=>{
    var vm = {
        layout: false
    }
    res.render('account/register',vm);
});

module.exports = router;