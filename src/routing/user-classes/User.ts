import app from './../general-server-classes/App';
import profile from './Profile';
import connection from './../general-server-classes/Database';
import { isNull } from 'util';
import admin from './AdminUser';
import { _appIdRandomProviderFactory, APP_ID_RANDOM_PROVIDER } from '@angular/core/src/application_tokens';
import { getRandomString } from 'selenium-webdriver/safari';

export default class User {

    private username: String;
    private id: String;
    private adminStatus: boolean;

    public constructor(user: User) {
        if (user === null) {
            this.username = '';
            this.id = null;
            this.adminStatus = false;
        } else {
            this.username = user.username;
            this.id = user.id;
            this.adminStatus = this.adminStatus;
        }
    }

<<<<<<< HEAD
    public validateUser(currentName: String, currentPassword: String): boolean {
        connection.query('SELECT Password FROM User WHERE Username = \'' + currentName + '\'', (err, result) => {
=======
    public async validateUser(currentName: String, currentPassword: String) {
        await connection.query('SELECT Password FROM User WHERE Username = ' + currentName, async (err, result) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            if (err) {
                throw err;
            } else if (result === currentPassword) {
                this.username = currentName;
<<<<<<< HEAD
                this.id = connection.query('SELECT UserID FROM User WHERE Username = \'' + currentName + '\'', (error) => {
=======
                this.id = await connection.query('SELECT UserID FROM User WHERE Username = ' + currentName, (error) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
                    if (error) {
                        throw error;
                    }
                    // if we did not get an error, then we check if they are an admin or not.
                    this.setAdmin();
                    console.log('ID got');
                });
            }
        });
        // If the id has been set, then we will return true.
        return !isNull(this.id);
    }

<<<<<<< HEAD
    public signUpUser(newUsername: String, newPassword: String, firstName: String, lastName: String, newID: String) {
=======
    public async signUpUser(newUsername: String, newPassword: String, firstName: String, lastName: String) {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
        this.username = newUsername;
        // tslint:disable-next-line:prefer-const
        let userArray: String[];
        userArray.fill(await connection.query('SELECT Username FROM User', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got the usernames.');
        }, 0, -1));
        userArray.forEach( async (value) => {
            if (!(this.username === value)) {
<<<<<<< HEAD
                connection.query('INSERT INTO User (Username, Password, Fname, Lname, UserID) VALUES (\''
                + this.username + '\', \'' + newPassword + '\', \'' + firstName + '\', \'' + lastName + '\', \'' + newID + '\'');
=======
                await connection.query('INSERT INTO User (Username, Password, Fname, Lname, UserID) VALUES ('
                + this.username + ', ' + newPassword + ', ' + firstName + ', ' + lastName + ', 0602232');
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            } else {
                console.log('Username already exists.');
                return 'Username already exists, try again';
            }
        });
        return !isNull(this.id);
    }

    // Getter for the ID of the user
    public getID(): String {
        return this.id;
    }

    private async setAdmin() {
        const adminArray: String[] = await connection.query('SELECT AdminID FROM Admin', (err) => {
            if (err) {
                throw err;
            }
            adminArray.forEach( (value) => {
                if (value === this.id) {
                    this.adminStatus = true;
                     // lets leave the loop
                }
            });
        });
    }

    public isAdmin(): boolean {
        return this.adminStatus;
    }
}
