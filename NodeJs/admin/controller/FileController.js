

// var express = require("express");
// var router = express.Router();
// var path = require("path");
// var fs = require("fs");
// var upload_file = require("../../repos/uploadRepo");
// router.post("/image_upload", function (req, res) {
//     upload_file(req, function(err, data) {
   
//       if (err) {
//         return res.status(404).end(JSON.stringify(err));
//       }
   
//       res.send(data);
//     });
//   });
   
//   // Create folder for uploading files.
//   var filesDir = path.join(path.dirname(require.main.filename), "uploads");
   
//   if (!fs.existsSync(filesDir)){
//     fs.mkdirSync(filesDir);
//   }
//   module.exports = router;