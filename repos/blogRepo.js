var db = require('../fn/db');
var config = require('../config/config');
exports.All = () =>{
    var sql = `select * from post where Status = 1 order by CreateDate DESC`;
    return db.load(sql);
}
exports.edit = (blog)=>{
    var sql = `update post set Tittle = '${blog.Tittle}',Description = '${blog.Description}' ,BodyContent = '${blog.BodyContent}', 
    Tag = '${blog.Tag}', PostCategoryID = ${blog.PostCategoryID}, 
    Image = '${blog.Image}' where ID = ${blog.ID}`;
    return db.save(sql);
}
exports.add =(blog) =>{
    var sql =`insert into post(Tittle,BodyContent, Tag, PostCategoryID, Image, Description) values('${blog.Tittle}','${blog.BodyContent}',
    '${blog.Tag}','${blog.PostCategoryID}', '${blog.Image}','${blog.Description}')`;
    return db.save(sql);
}   
exports.listNew =() => {
    var sql = `select * from post where Status = 1 order by CreateDate DESC limit ${config.BLOG_PER_PAGE}`;
    return db.load(sql);
}
exports.delete = (id)=>{
    var sql = `update post set Status = 0 where ID = ${id}`;
    return db.save(sql);
}
exports.Single =(id)=>{
    var sql = `select * from post where ID = ${id}`;
    return db.load(sql);
}