import connection from './../general-server-classes/Database';
import Library from './Library';

export default class DeveloperLibrary extends Library {
    private companyName: String;
    private yearFounded: number;

<<<<<<< HEAD
    public constructor(name: String, userID) {
        super(name, userID);
        this.companyName = connection.query('SELECT Name FROM Developer WHERE LibID = \'' + super.getLibID + '\'', (err) => {
=======
    public constructor(name: String) {
        super(name);
    }

    public async fillInfo() {
        this.companyName = await connection.query('SELECT Name FROM Developer WHERE LibID = ' + super.getLibID, (err) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            if (err) {
                throw err;
            }
            console.log('Got dev name');
        });
<<<<<<< HEAD
        this.yearFounded = connection.query('SELECT YearFounded FROM Developer WHERE LibID = \'' + super.getLibID + '\'', (err) => {
=======
        this.yearFounded = await connection.query('SELECT YearFounded FROM Developer WHERE LibID = ' + super.getLibID, (err) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            if (err) {
                throw err;
            }
            console.log('Got year founded.');
        });
    }
    public getCompanyName(): String {
        return this.companyName;
    }

    public getYearFounded(): number {
        return this.yearFounded;
    }
}
