"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var express = require('express');
var app = express();
var port = 3000;
var cache = ['hello'];
var myDB = {};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/make-a-move', function (req, res) {
    console.log(req);
    cache.push(req.body.test);
    res.redirect('/');
});
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});
