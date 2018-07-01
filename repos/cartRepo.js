var db = require('../fn/db');
exports.add = (cart, CartItem) => {
    for (i = cart.length - 1; i >= 0; i--) {
        if (cart[i].productID === CartItem.productID) {
            cart[i].quantity += CartItem.quantity;
            return;
        }
    }
    cart.push(CartItem);
}

exports.remove = (cart, productID) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (productID === cart[i].productID) {
            cart.splice(i, 1);
            return;
        }
    }
}
exports.removeAll = (cart) => {
    cart.splice(0, cart.length);
    return;
}

exports.loadAllOrderByUserID = (userID)=>{
    var sql = `select * from dm_order where UserID = ${userID}`;
    return db.load(sql);
}

exports.updateQuantity = (quantity, productID) =>{
    var sql = `update product set Quantity = Quantity - ${quantity},SeoCount = SeoCount + ${quantity} where ID = ${productID}`;
    return db.save(sql);
}
exports.FindOrderIDbyCreateDate = (createDate) => {
    var sql = `select ID from dm_order where CreateDate = '${createDate}'`;
    return db.load(sql);
}

exports.LoadOrderDetail = (orderID) =>{
    var sql = `select * from orderdetail where OrderID = ${orderID}`;
    return db.load(sql);
}

exports.SaveCart = (cart, userID,dateNow) => {
    var sql = `insert into dm_order(UserID, CreateDate) values(${userID},'${dateNow}')`;
    return db.save(sql);
}

exports.SaveCartDetail = (orderID,cartItem) => {
    var sql = `insert into orderdetail(OrderID,ProductID,Quantity) values(${orderID},${cartItem.productID},${cartItem.quantity})`;
    return db.save(sql);
}