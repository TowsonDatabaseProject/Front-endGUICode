class Database {
    private mysql = require('mysql');

    connection = this.mysql.createConnection({
        host: '127.0.0.1',
        user: 'alynch14',
        password: 'Cosc*kffb',
        database: 'alynch14db',
        port: 3360,
        insecureAuth: true
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

