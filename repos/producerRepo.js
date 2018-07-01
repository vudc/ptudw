var db = require('../fn/db');

exports.single = (id) =>{
    var sql = `select * from producer where ID = ${id}`;
    return db.load(sql);
}

exports.edit = (producer) =>{
    var sql = `update producer set Name = '${producer.name}',Address = '${producer.address}', Phone = '${producer.phone}',
    Email = '${producer.email}',Website = '${producer.website}' where ID = ${producer.id}`;
    return db.save(sql);
}

exports.LoadAll = () => {
    var sql = 'select * from producer';
    return db.load(sql);
}

exports.add = (producer) => {
    var sql = `insert into producer(Name,Address,Phone,Email,Website) 
    values('${producer.name}','${producer.address}','${producer.phone}','${producer.email}','${producer.website}')`;
    return db.save(sql);
}


exports.delete = (id) =>{
    var sql = `update producer set Status = 0 where ID = ${id}`;
    return db.save(sql);
}