import connection from './../general-server-classes/Database';
import { Title } from '@angular/platform-browser';

export default class Game {
    private title: String;
    private developedBy: String;
    private licensedBy: String;
    private releasedFor: String;
    private ownedBy: String;
    private wishedForBy: String;
    private publishedBy: String;

    constructor(libID: String) {
        if (libID === null) {
            this.title = '';
            this.developedBy = '';
            this.licensedBy = '';
            this.releasedFor = '';
            this.ownedBy = '';
            this.wishedForBy = null;
            this.publishedBy = '';
        }
        this.ownedBy = libID;
        async function pullMyInfo() {
            this.title = await connection.query('SELECT Title FROM Game WHERE OwnedBy = \'' + libID + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('We got through it dude');
            });
            this.developedBy = await connection.query('SELECT DevelopedBy FROM Game WHERE Title = \'' + this.title + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('More to come from here Shaggy');
            });
            this.licensedBy = await connection.query('SELECT LicensedBy FROM Game WHERE Title = \'' + this.title + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('More bark Scoob');
            });
            this.releasedFor = await connection.query('SELECT ReleasedFor FROM Game WHERE Title = \'' + this.title + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('More mayonnaise scoob');
            });
            this.wishedForBy = await connection.query('SELECT WishedForBy FROM Game WHERE Title = \'' + this.title + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('More Tuna fish Scoob');
            });
            this.publishedBy = await connection.query('SELECT PublishedBy FROM Game WHERE Title = \'' + this.title + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('More carrots Scoob');
            });
        }
        pullMyInfo();
    }

    public getTitle() {
        return this.title;
    }

    public getPublisher() {
        return this.publishedBy;
    }

    public getDeveloper() {
        return this.developedBy;
    }

    public getLicensor() {
        return this.licensedBy;
    }

    public getSystems() {
        return this.releasedFor;
    }

    public getLibraries() {
        return this.ownedBy;
    }

    public getWishedFor() {
        return this.wishedForBy;
    }

    public setTitle(title: String) {
        this.title = title;
    }

    public setLibrary(ownedBy: String) {
        this.ownedBy = ownedBy;
    }

    public setWishedFor(wishedForBy: String) {
        this.wishedForBy = wishedForBy;
    }

    public setPublisher(publisher: String) {
        this.publishedBy = publisher;
    }

    public setDeveloper(developer: String) {
        this.developedBy = developer;
    }

    public setLicensor(licensor: String) {
        this.licensedBy = licensor;
    }

    public setSystem(system: String) {
        this.releasedFor = system;
    }

    public addEntry() {
        connection.query('INSERT INTO Game \(Title, DevelopedBy, PublishedBy, LicensedBy, OwnedBy, ReleasedFor, WishedForBy\) '
         + 'VALUES \(\'' + this.title + '\', \'' + this.developedBy + '\', \'' + this.publishedBy + '\', \'' + this.licensedBy +
         '\', \'' + this.ownedBy + '\', \'' + this.releasedFor + '\', \'' + this.wishedForBy + '\'\);', (err) => {
             if (err) {
                 throw err;
             }
             console.log('Successfully added new game into database.');
         });
    }
}
