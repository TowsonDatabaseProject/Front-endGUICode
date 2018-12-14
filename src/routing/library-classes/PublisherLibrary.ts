import connection from './../general-server-classes/Database';
import Library from './Library';

export default class PublisherLibrary extends Library {
    private subsidiaries: String[];
    private parentCompany: String;

    constructor(name: String) {
        async function getID() {
            return await connection.query('SELECT PubID FROM Publisher WHERE PubName = \'' + name + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('almost done me boy');
            });
        }
        super(name, getID());
        this.getBusinessStuff();
    }

    public async getBusinessStuff() {
        this.subsidiaries = await connection.query('SELECT Subsidiaries FROM Publisher WHERE Name = \'' + name + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got the subsidiaries.');
        });
        this.parentCompany = await connection.query('SELECT ParentCompany FROM Publisher WHERE Name = \'' + name + '\';', (err) => {
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
