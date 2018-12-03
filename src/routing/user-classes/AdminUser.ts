import connection from './../general-server-classes/Database';
import User from './User';

export default class AdminUser extends User {
    private levelOfAccess: number;

    constructor(user: User) {
        super(user);
        this.levelOfAccess = 0;
    }

    public getLevelOfAccess() {
        this.levelOfAccess = connection.query('SELECT LevelOfAccess FROM Admin WHERE AdminID = ' + super.getID, (err) => {
            if (err) {
                throw err;
            }
            console.log('Got level of access for admin');
        });
        return this.levelOfAccess;
    }
}
