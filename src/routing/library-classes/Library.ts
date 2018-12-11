import connection from '../general-server-classes/Database';
import Game from './Game';

export default class Library {
    protected name: String;
    protected gameList: Game[];
    protected libID: String;
    protected ownerID: String;

    constructor(name: String, ownedID) {
        this.name = name;
        this.ownerID = ownedID;
    }

    public async getSystemsList(licName: String) {
        return await connection.query('SELECT SysName FROM Systems WHERE SysID = \'' + this.libID
            + '\'\nUNION\nSELECT SysName FROM Systems WHERE OwnedBy = \'' + licName + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('We got the systems and their licensor');
            });
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

    public async getGameList() {
        return await connection.query('SELECT Title FROM Game WHERE ReleasedFor = \'' + this.getName() + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('More Bananananananas scoob');
        });
    }
}
