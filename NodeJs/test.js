var mysql = require('mysql');
var cn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Congvu307',
    database: 'duyenmay',
    insecureAuth : true
});
cn.connect();
var sql = 'select * from test';
cn.query(sql, function(error, results, fields) {
    if (error)
        throw error;
    console.log(results);
    cn.end();
});