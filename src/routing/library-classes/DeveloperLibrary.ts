import connection from './../general-server-classes/Database';
import Library from './Library';

export default class DeveloperLibrary extends Library {
    private companyName: String;
    private yearFounded: number;

    constructor(library: Library) {
        super(library.getName(), library.getOwner());
    }

    public async fillInfo() {
        this.companyName = await connection.query('SELECT Name FROM Developer WHERE LibID = \'' + super.getLibID + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got dev name');
        });
        this.yearFounded = await connection.query('SELECT YearFounded FROM Developer WHERE LibID = \'' + super.getLibID + '\';', (err) => {
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
