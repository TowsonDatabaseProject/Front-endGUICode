import connection from './../general-server-classes/Database';
import Library from './Library';

export default class SystemLibrary extends Library {
    private specifications: String;
    private licensor: String;

    constructor(name: String) {
        async function getIDNumber() {
            return await connection.query('SELECT SysID FROM Systems WHERE SysName = \'' + name + '\';');
        }
        super(name, getIDNumber());
        this.queryInfo();
    }

    public async queryInfo() {
        this.specifications = await connection.query('SELECT Specs FROM Systems WHERE SysName = \'' + super.getName() + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got specs.');
        });
        this.licensor = await connection.query('SELECT OwnedBy FROM Systems WHERE SysName = \'' + super.getName() + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('Licensor is gotten');
        });
    }

    public getLicensor(): String {
        return this.licensor;
    }

    public getSpecifications(): String {
        return this.specifications;
    }
}
