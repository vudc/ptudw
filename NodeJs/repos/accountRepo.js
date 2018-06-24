var db = require('../fn/db');

exports.login = user => {
    var sql = `select * from user where f_Username = '${user.username}' and f_Password = '${user.password}'`;
    return db.load(sql);
}
exports.isUserExsits = username => {
    var sql = `select * from user where f_Username = '${username}' `;
    return db.load(sql);
}
exports.add = user => {
    var sql = `insert into user(f_Username, f_Password, FullName,Address, DoB, Email) 
    values('${user.username}', '${user.password}','${user.fullname}','${user.address}','${user.dob}', '${user.email}')`;
    return db.save(sql);
}
//, 

//