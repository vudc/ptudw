

var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var upload_file = require("../../repos/uploadRepo");
var FroalaEditor = require('wysiwyg-editor-node-sdk/lib/froalaEditor');
router.post("/image_upload", function (req, res) {
    upload_file(req, function (err, data) {

        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }

        res.send(data);
    });
});

router.get('/load_images', function (req, res) {

    FroalaEditor.Image.list('/public/uploads/', function (err, data) {

        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        for (var i = 0;i<data.length;i++){
            data[i].url = data[i].url.slice(7);
            data[i].thumb = data[i].thumb.slice(7);
        }
        return res.send(data);
    });
});
// Create folder for uploading files.

module.exports = router;