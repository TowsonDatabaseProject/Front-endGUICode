

class Database {
    private mysql = require('mysql');

    connection = this.mysql.createConnection({
        host: '127.0.0.1:3360',
        username: 'alynch14',
        password: 'Cosc*kffb',
        database: 'alynch14db'
    });

    constructor() {
        this.connection.connect((err) => {
            if (err) {
                throw err;
            }
            console.log('Connected!');
        });
    }
}

export default new Database().connection;
