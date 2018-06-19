var express = require('express'),
    moment = require('moment');
var router = express.Router();
router.get('/login', (req, res) => {
    var vm = {
        layout: false
    }
    res.render('account/login',vm);
});
router.get('/register', (req, res)=>{
    var vm = {
        layout: false
    }
    res.render('account/register',vm);
});

module.exports = router;