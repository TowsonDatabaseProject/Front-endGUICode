import connection from './../general-server-classes/Database';
import Library from './Library';

export default class PublisherLibrary extends Library {
    private subsidiaries: String[];
    private parentCompany: String;

    constructor(library: Library) {
        super(library.getName(), library.getOwner());
    }

    public async getBusinessStuff() {
        this.subsidiaries.fill(await connection.query('SELECT Subsidiaries FROM Publisher WHERE Name = ' + name, (err) => {
            if (err) {
                throw err;
            }
            console.log('Got the subsidiaries.');
        }));
        this.parentCompany = await connection.query('SELECT ParentCompany FROM Publisher WHERE Name = ' + name, (err) => {
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
