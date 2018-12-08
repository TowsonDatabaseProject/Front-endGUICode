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

    public async getGameList() {
        this.gameList.fill(await connection.query('SELECT ', (err) => {
            if (err) {
                throw err;
            }
            console.log('we got the list');
        }), 0, -1);
        return this.gameList;
    }

    public async getSystemsList(licName: String) {
        return Array().fill( await connection.query('SELECT SysName FROM Systems WHERE SysID = \'' + this.libID
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

    public getOwner(): String {
        return this.ownerID;
    }
}
