var db = require("../fn/db");
var config = require('../config/config');
exports.loadAll = () => {
    var sql = "select * from product";
    return db.load(sql);
}

//tải 1 sản phẩm
exports.SinglewithFull = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select product.Quantity, product.ViewCount, product.SeoCount, product.ID, product.Name, product.Discription,product.Price, product.Image,product.categoryID,
        product.Detail, product.CreateDate,category.Name as categoryName, product.Status, producer.Name as producerName
        from product INNER JOIN category ON category.ID = product.CategoryID
        INNER JOIN producer ON product.producerID = producer.ID
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

exports.AddView = (number, productID) => {
    var sql = `update product set ViewCount = ViewCount + ${number} where ID = ${productID}`;
    return db.save(sql);
}

exports.FindProduct = (searchContent) => {
    var sql = `select product.ViewCount, product.SeoCount,product.Name as productName, product.ID, product.Discription,product.Price, product.Image,product.categoryID,
    product.Detail, product.CreateDate,category.Name as categoryName, product.Status, producer.Name as producerName
    from product INNER JOIN category ON category.ID = product.CategoryID
    INNER JOIN producer ON product.producerID = producer.ID
                        where `;
    if (searchContent.searchType === 'Category') {
        sql += `category.Name LIKE '%${searchContent.searchString}%'`;
    } else {
        if (searchContent.searchType === 'Producer') {
            sql += `producer.Name LIKE '%${searchContent.searchString}%'`;
        } else {
            sql += `product.Name LIKE '%${searchContent.searchString}%'`;
        }
    }
    console.log(sql);
    return db.save(sql);
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

exports.topview = () => {
    var sql = '(SELECT * FROM product ORDER BY ViewCount DESC LIMIT 12)';
    return db.load(sql);
}

exports.topsell = () => {
    var sql = '(SELECT * FROM product ORDER BY SeoCount DESC LIMIT 12) ORDER BY SeoCount desc';
    return db.load(sql);
}

exports.add = (p) => {
    console.log(p);
    var sql = `insert into product(Name,Discription,Image,Price,PromotionPrice,CategoryID,Detail,producerID) 
    values('${p.name}','${p.discription}','${p.image}','${p.price}','${p.promotionprice}',${p.categoryid},'${p.detail}',${p.producerid})`;
    return db.save(sql);
}
exports.edit = (p) => {
    var sql = `update product set Name = '${p.name}', Discription = '${p.discription}', Image = '${p.image}', Price = '${p.price}',
    PromotionPrice = '${p.promotionprice}', CategoryID = ${p.categoryid}, Detail = '${p.detail}',producerID = ${p.producerid} where ID = ${p.id}`;
    console.log(sql);
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
exports.countByCategoryID = (categoryID) => {
    sql = `select count(*) as totalProduct from product where categoryID = ${categoryID}`;
    return db.load(sql);
}

exports.countByProducerID = (producerID) => {
    sql = `select count(*) as totalProduct from product where producerID = ${producerID}`;
    return db.load(sql);
}

exports.loadByCategoryPagination = (categoryID, offset) => {
    var sql = `select product.ID, product.Image, product.Name as productName, product.categoryID,
    category.Name as categoryName, product.Price,  producer.Name as producerName
    from product INNER JOIN category ON product.categoryID = category.ID INNER JOIN producer ON producer.ID = product.producerID
    where product.categoryID = ${categoryID}
    limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.loadByProducerPagination = (producerID, offset) => {
    var sql = `select product.ID, product.Image, product.Name as productName, 
    category.Name as categoryName, product.Price, product.categoryID, 
    producer.Name as producerName
    from product INNER JOIN category ON product.categoryID = category.ID
    INNER JOIN producer ON producer.ID = product.producerID
    where product.producerID = ${producerID}
    limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.loadOrderCategory = (productID) => {
    var sql = `select *,product.ID as productID,product.Name as productName,category.Name as categoryName from product INNER JOIN category 
    ON product.categoryID = category.ID
    where categoryID in (select categoryID from product where ID = ${productID})`;
    return db.load(sql);
}

exports.loadOrderProducer = (productID) => {
    var sql = `select *,product.categoryID as categoryID,producer.Name as producerName,product.ID as productID,product.Name as productName,category.Name as categoryName from product INNER JOIN category 
    ON product.categoryID = category.ID INNER JOIN producer ON product.producerID = producer.ID
    where producerID in (select producerID from product where ID = ${productID})`;
    return db.load(sql);
}

