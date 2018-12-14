import connection from './../general-server-classes/Database';

export default class Profile {
    private firstName: String;
    private lastName: String;
    private libraryName: String[];
    private id: String;

    public constructor() {
        this.firstName = '';
        this.lastName = '';
        this.libraryName = new Array();
        this.id = null;
    }

    public async getProfileInfo() {
        this.firstName = await connection.query('SELECT Fname FROM User WHERE UserID = \'' + this.id + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('got firstName');
        });
        this.lastName = await connection.query('SELECT Lname FROM User WHERE UserID = \'' + this.id + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('got lastName');
        });

        const name = this.firstName + ' ' +  this.lastName;

        return name;
    }

    public async getLibraryNames() {
        this.libraryName = await connection.query('SELECT LibID FROM Library WHERE UserID = \'' + this.id + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('got libraryName');
        });
        return this.libraryName;
    }

    public setID(id: String) {
        this.id = id;
    }
}
