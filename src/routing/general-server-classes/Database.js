"use strict";
exports.__esModule = true;
var Database = /** @class */ (function () {
    function Database() {
        this.mysql = require('mysql');
        this.connection = this.mysql.createConnection({
            host: '127.0.0.1',
            user: 'alynch14',
            password: 'Cosc*kffb',
            database: 'alynch14db',
            port: 3360,
            insecureAuth: true
        });
        this.connection.connect(function (err) {
            if (err) {
                throw err;
            }
            console.log('Connected!');
        });
    }
    return Database;
}());
exports["default"] = new Database().connection;
