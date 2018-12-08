import connection from './../general-server-classes/Database';
import Library from './Library';

export default class PublisherLibrary extends Library {
    private subsidiaries: String[];
    private parentCompany: String;

<<<<<<< HEAD
    constructor(name: String, userID: String) {
        super(name, userID);
        this.subsidiaries.fill(connection.query('SELECT Subsidiaries FROM Publisher WHERE Name = \'' + name + '\'', (err) => {
=======
    constructor(name: String) {
        super(name);
    }

    public async getBusinessStuff() {
        this.subsidiaries.fill(await connection.query('SELECT Subsidiaries FROM Publisher WHERE Name = ' + name, (err) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            if (err) {
                throw err;
            }
            console.log('Got the subsidiaries.');
        }));
<<<<<<< HEAD
        this.parentCompany = connection.query('SELECT ParentCompany FROM Publisher WHERE Name = \'' + name + '\'', (err) => {
=======
        this.parentCompany = await connection.query('SELECT ParentCompany FROM Publisher WHERE Name = ' + name, (err) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            if (err) {
                throw err;
            }
        });
    }
    public getSubsidiaries(): String[] {
        return this.subsidiaries;
    }

    public getParentCompany(): String {
        return this.parentCompany;
    }
}
