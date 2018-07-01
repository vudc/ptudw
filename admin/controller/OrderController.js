var express = require('express');
var orderRepo = require('../../repos/orderRepo');
var moment = require('moment');
var cartRepo = require('../../repos/cartRepo');
var check = require('../../repos/checkRepo');
var productRepo = require('../../repos/productRepo')
var userRepo = require('../../repos/accountRepo')
var router = express.Router();

router.get('/', (req, res) => {
    if (!check.isAdmin(req.session.User)) {
        res.redirect('/account/login');
        return;
    }
    orderRepo.loadAllOrder().then(result => {
        for( var i = 0;i<result.length;i++){
            result[i].orderCreateDate = moment(result[i].orderCreateDate,'YYYY-MM-DD HH:mm:ss').format('D/M/YYYY');
        }
        var vm = {
            layout: '_LayoutAdmin',
            listOrder: result,
        }
        res.render('../admin/views/order/index', vm);
    })
})
router.get('/edit', (req, res) => {
    orderRepo.single(req.query.id).then(r => {
        r[0].CreateDate = moment(r[0].CreateDate,'YYYY-MM-DD HH:mm:ss').format('D/M/YYYY');
        var vm = {
            order: r[0],
            layout: '_LayoutAdmin'
        }
        res.render('../admin/views/order/edit', vm);
    }).catch(err => {
        res.redirect('/home/error');
    })
})
router.post('/edit',(req,res)=>{
    var order = {
        id : req.body.ID,
        userid: req.body.UserID,
        status: req.body.Status,
        createdate: moment(req.body.CreateDate,'D/M/YYYY').format('YYYY-MM-DD HH:mm:ss'),
    }
    orderRepo.adminEdit(order).then(r =>{
        res.redirect('/admin/order');
    }).catch(err=>{
        res.redirect('/home/error');
    })
})
router.get('/detail',(req,res)=>{
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
                    orderDetailID: listOrderDetail[i].ID,
                    quantity: quantity,
                    amount: quantity * result[i].Price,
                    product: result[i]
                }
                ListProduct.push(orderItem);
            }
            var vm = {
                listProduct: ListProduct,
                layout: '_LayoutAdmin'
            }
            console.log(vm);
            res.render('../admin/views/order/detail',vm);
        })
    })
})

router.post('/deleteOrderDetail',(req,res)=>{
    var orderDetailID = req.body.orderDetailID;
    orderRepo.deleteOrderDetail(orderDetailID).then(r=>{
        res.redirect('/admin/order');
    }).catch(err=>{
        res.redirect('/home/error');
    })
})
module.exports = router;