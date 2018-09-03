const express = require('express')
var multer  =   require('multer');
var fs = require('fs')
var path = require('path')
var crypto = require('crypto');
var router = express.Router();
var storage = multer.diskStorage({
  //folder upload -> public/upload
  destination: './public/upload/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, Math.floor(Math.random()*9000000000) + 1000000000 + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage });
router.post('/upload', upload.single('flFileUpload'), function (req, res, next) {
  res.redirect('back')
});
router.get('/list', function (req, res) {
    const images = fs.readdirSync('public/upload')
    var sorted = []
    for (let item of images){
        if(item.split('.').pop() === 'png'
        || item.split('.').pop() === 'jpg'
        || item.split('.').pop() === 'jpeg'
        || item.split('.').pop() === 'svg'){
            var abc = {
                  "image" : "/upload/"+item,
                  "folder" : '/'
            }
            sorted.push(abc)
        }
    }
    res.send(sorted);
  })
router.get('/', function (req, res) {
  var title = "Plugin Imagebrowser ckeditor for nodejs"
  res.render('index', { result: 'result' })
})
// Create folder for uploading files.

module.exports = router;