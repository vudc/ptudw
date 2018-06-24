var db = require('../fn/db');

exports.LoadAll = () => {
    var sql = 'select * from producer';
    return db.load(sql);
}