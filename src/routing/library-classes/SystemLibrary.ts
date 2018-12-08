import connection from './../general-server-classes/Database';
import Library from './Library';

export default class SystemLibrary extends Library {
    private specifications: String;
    private licensor: String;

    constructor(library: Library) {
        super(library.getName(), library.getOwner());
    }

    public async queryInfo() {
        this.specifications = await connection.query('SELECT Specs FROM Systems WHERE LibID = ' + super.getLibID, (err) => {
            if (err) {
                throw err;
            }
            console.log('Got specs.');
        });
        this.licensor = await connection.query('SELECT Licensor FROM Systems WHERE LibID = ' + super.getLibID, (err) => {
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
