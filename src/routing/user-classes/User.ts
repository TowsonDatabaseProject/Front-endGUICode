import app from './../general-server-classes/App';
import profile from './Profile';
import connection from './../general-server-classes/Database';
import { isNull } from 'util';
import admin from './AdminUser';

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

    public validateUser(currentName: String, currentPassword: String): boolean {
        connection.query('SELECT password FROM users WHERE username = ' + currentName, (err, result) => {
            if (err) {
                throw err;
            } else if (result === currentPassword) {
                this.username = currentName;
                this.id = connection.query('SELECT id_number FROM users WHERE username = ' + currentName, (error) => {
                    if (error) {
                        throw err;
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

    // Getter for the ID of the user
    public getID(): String {
        return this.id;
    }

    private setAdmin() {
        const adminArray: String[] = connection.query('SELECT id_number FROM admin', (err) => {
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
