const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1:3360',
    username: 'alynch14',
    password: 'Cosc*kffb',
    database: 'alynch14db'
});

export default connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the Database!');
});
