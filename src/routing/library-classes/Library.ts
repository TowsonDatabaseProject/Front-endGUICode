import connection from '../general-server-classes/Database';

export default class Library {
    protected name: String;
    protected gameList: String[];
    protected libID: String;
    protected ownerID: String;

    constructor(name: String, ownedID: String) {
        this.name = name;
        this.gameList = Array();
        this.ownerID = ownedID;
    }

<<<<<<< HEAD
    public getGameList(): String[] {
        this.libID = connection.query('SELECT LibName FROM Library WHERE OwnerID = \'' + this.ownerID + '\'', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got the libID');
        });
        this.gameList.fill(connection.query('SELECT Title FROM Game WHERE OwnedBy = \'' + this.libID + '\'' , (err) => {
=======
    public async getGameList() {
        this.gameList.fill(await connection.query('SELECT ', (err) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            if (err) {
                throw err;
            }
            console.log('we got the list');
        }), 0, -1);
        return this.gameList;
    }

    public getSystemsList(licName: String): String[] {
        return Array().fill(connection.query('SELECT SysName FROM Systems WHERE SysID = \'' + this.libID
            + '\'\nUNION\nSELECT SysName FROM Systems WHERE OwnedBy = \'' + licName + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('We got the systems and their licensor');
            }), 0 , -1);
    }

    public getLibID(): String {
        return this.libID;
    }

    public getName(): String {
        return this.name;
    }
}
