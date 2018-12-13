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
        return await connection.query('SELECT Title FROM Game WHERE OwnedBy = \'' + this.libID + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('More Bananananananas scoob');
        });
    }

    public async addGame(gameObject: Game) {
        await connection.query('INSERT INTO Game (Title, OwnedBy, ReleasedFor, LicensedBy, DevelopedBy, PublishedBy)'
        + ' VALUES (\'' + gameObject.getTitle() + '\', \'' + this.libID + '\', \'' + gameObject.getSystems()
        + '\', \'' + gameObject.getLicensor() + '\', \'' + gameObject.getDeveloper() + '\', \'' + gameObject.getPublisher() + '\');',
        (err) => {
            if (err) {
                throw err;
            }
            console.log('Added game to database, linked to this library');
        });
    }

    public async createNewLibrary(name: String, id: String, owner: String) {
        await connection.query('INSERT INTO Library (LibID, LibName, OwnerID) VALUES (\''
        + id + '\', \'' + name + '\', \'' + owner + '\');', (err) => {
            if (err) {
                throw err;
            }
            console.log('Registered new Library');
        });
    }
}
