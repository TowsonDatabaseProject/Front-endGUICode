import connection from './../general-server-classes/Database';

class Profile {
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

    public getProfileInfo(): String {
        this.firstName = connection.query('SELECT Fname FROM User WHERE UserID = ' + this.id, (err) => {
            if (err) {
                throw err;
            }
            console.log('got firstName');
        });
        this.lastName = connection.query('SELECT Lname FROM User WHERE UserID = ' + this.id, (err) => {
            if (err) {
                throw err;
            }
            console.log('got lastName');
        });

        const name = this.firstName + ' ' +  this.lastName;

        return name;
    }

    public getLibraryName(): String[] {
        this.libraryName.fill(connection.query('SELECT LibID FROM Library WHERE UserID = ' + this.id, (err) => {
            if (err) {
                throw err;
            }
            console.log('got libraryName');
        }), 0, -1);
        return this.libraryName;
    }

    public setID(id: String) {
        this.id = id;
    }
}

export default new Profile();
