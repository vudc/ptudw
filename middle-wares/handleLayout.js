var categoryRepo = require('../repos/categoryRepo');
var producerRepo = require('../repos/producerRepo');
module.exports = (req, res, next) => {

    if (req.session.isLogged === undefined) {
        req.session.isLogged = false;

    }
    
    categoryRepo.loadAll().then(rows => {
        producerRepo.LoadAll().then(row2 => {
            res.locals.layoutVM = {
                categories: rows,
                listProducer: row2,
                isLogged: req.session.isLogged,
                currentUser: req.session.User,
                CartLength: (req.session.Cart === undefined) ? 0 : req.session.Cart.length,
                Cart: req.session.Cart
            };
            next();
        });
        
    });
};