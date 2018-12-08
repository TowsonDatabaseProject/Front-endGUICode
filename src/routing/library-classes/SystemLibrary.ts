import connection from './../general-server-classes/Database';
import Library from './Library';

export default class SystemLibrary extends Library {
    private specifications: String;
    private licensor: String;

<<<<<<< HEAD
    public constructor (name: String, userID: String) {
        super(name, userID);
        this.specifications = connection.query('SELECT Specs FROM Systems WHERE LibID = \'' + super.getLibID + '\'', (err) => {
=======
    public constructor (name: String) {
        super(name);
    }

    public async queryInfo() {
        this.specifications = await connection.query('SELECT Specs FROM Systems WHERE LibID = ' + super.getLibID, (err) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            if (err) {
                throw err;
            }
            console.log('Got specs.');
        });
<<<<<<< HEAD
        this.licensor = connection.query('SELECT Licensor FROM Systems WHERE LibID = \'' + super.getLibID + '\'', (err) => {
=======
        this.licensor = await connection.query('SELECT Licensor FROM Systems WHERE LibID = ' + super.getLibID, (err) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
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
