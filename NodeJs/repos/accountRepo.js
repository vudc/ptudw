var db = require('../fn/db');

exports.login = user => {
    var sql = `select * from user where Username = '${user.username}' and Password = '${user.password}'`;
    return db.load(sql);
}