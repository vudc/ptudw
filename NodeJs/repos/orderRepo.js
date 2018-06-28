var db = require('../fn/db');

exports.loadAllOrder =() =>{
    var sql = `select *, dm_order.CreateDate as orderCreateDate from dm_order INNER JOIN user ON user.ID = dm_order.UserID`;
    return db.load(sql);
}
