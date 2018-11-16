var db = require('../fn/db');
exports.All = () =>{
    var sql = `select * from post_category`;
    return db.load(sql);
}
exports.Single = (id) =>{
    var sql = `select * from post_category where ID = ${id}`;
    return db.load(sql);
}
exports.Add = (blog_category) =>{
    var sql =`insert into post_category(Name,Description,Note)
    values('${blog_category.Name}','${blog_category.Description}','${blog_category.Note}')`;
    return db.save(sql);
}
exports.Update = (blog_category) => {
    var sql = `update post_category set Name = '${blog_category.Name}',
    Description = '${blog_category.Description}',Note = '${blog_category.Note}' where ID = ${blog_category.ID}`;
    return db.save(sql);
}
exports.Delete = (id)=>{
    var sql = `update post_category set Status = 0 where ID = ${id}`;
    return db.save(sql);
}
