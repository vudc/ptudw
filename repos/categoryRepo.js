var db = require("../fn/db");
exports.loadAll = () => {
    var sql = "select * from category";
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from category where ID = ${id}`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.add = (c) => {
    var sql = `insert into category(Name,Discription) values('${c.Name}','${c.Discription}')`;
    return db.save(sql);
}
exports.delete = (id) => {
    var sql = `update category set Status = 0 where ID = ${id}`;
    return db.save(sql);
}
exports.update = (c) => {
    var sql = `update category set Name = '${c.Name}',Discription = '${c.Discription}' where ID = ${c.ID}`;;
    return db.save(sql);
}
