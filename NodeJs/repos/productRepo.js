var db = require("../fn/db");
exports.loadAll = () => {
    var sql = "select * from product";
    return db.load(sql);
}

//tải 1 sản phẩm
exports.SinglewithFull = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select product.ID, product.Name, product.Discription,product.Price, product.Image,product.categoryID,
        product.Detail, product.CreateDate,category.Name as categoryName, product.Status
        from product INNER JOIN category ON category.ID = product.CategoryID
                            where product.ID = ${id}`;
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

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from product where ID = ${id}`;
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
exports.topnew = () => {
    var sql = '(SELECT * FROM product ORDER BY CreateDate DESC LIMIT 12) ORDER BY CreateDate desc';
    return db.load(sql);
}
exports.add = (p) => {
    console.log(p);
    var sql = `insert into product(Name,Discription,Image,Price,PromotionPrice,CategoryID,Detail) 
    values('${p.Name}','${p.Discription}','${p.Image}','${p.Price}','${p.PromotionPrice}','${p.CategoryID}','${p.Detail}')`;
    return db.save(sql);
}   
exports.delete = (c) => {
    var sql = `update category set Status ='${c.Status}' where ID = ${c.ID}`;
    return db.save(sql);
}
exports.update = (c) => {
    var sql = `update category set Name = '${c.Name}',Subname = '${c.Subname}' where ID = ${c.ID}`;;
    return db.save(sql);
}
