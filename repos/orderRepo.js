var db = require('../fn/db');

exports.loadAllOrder =() =>{
    var sql = `select *,dm_order.Status as orderStatus, dm_order.CreateDate as orderCreateDate,dm_order.ID as orderID from dm_order INNER JOIN user ON user.ID = dm_order.UserID`;
    return db.load(sql);
}
exports.adminEdit = (order) =>{
    var sql = `update dm_order set UserID = ${order.userid}, CreateDate = '${order.createdate}', Status = ${order.status} where ID = ${order.id}`;
    return db.save(sql);
}
exports.single = (id) =>{
    var sql = `select * from dm_order where ID = ${id}`;
    return db.load(sql);
}
exports.deleteOrderDetail = (id)=>{
    var sql = `delete from orderdetail where ID = ${id}`;
    return db.save(sql);
}