"use strict";
exports.__esModule = true;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1:3360',
    username: 'alynch14',
    password: 'Cosc*kffb',
    database: 'alynch14db'
});
exports["default"] = connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('Connected to the Database!');
});
