const mysql = require('mysql');

const connection = this.mysql.createConnection({
    host: '127.0.0.1:3360',
    username: 'alynch14',
    password: 'Cosc*kffb',
    database: 'alynch14db'
});

export default this.connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected!');
});
// export default new Database().connection;
