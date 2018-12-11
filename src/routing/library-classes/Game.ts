import connection from './../general-server-classes/Database';
import { Title } from '@angular/platform-browser';

export default class Game {
    private title: String;
    private developedBy: String;
    private licensedBy: String;
    private releasedFor: String[];
    private ownedBy: String;
    private wishedForBy: String;
    private publishedBy: String;

    constructor(libID: String) {
        this.ownedBy = libID;
        async function pullMyInfo() {
            this.title = await connection.query('SELECT Title FROM Game WHERE OwnedBy = \'' + libID + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('We got through it dude');
            });
            this.developedBy = await connection.query('SELECT DevelopedBy FROM Game WHERE Title = \'' + this.title + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('More to come from here Shaggy');
            });
            this.licensedBy = await connection.query('SELECT LicensedBy FROM Game WHERE Title = \'' + this.title + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('More bark Scoob');
            });
            this.releasedFor = await connection.query('SELECT ReleasedFor FROM Game WHERE Title = \'' + this.title + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('More mayonnaise scoob');
            });
            this.wishedForBy = await connection.query('SELECT WishedForBy FROM Game WHERE Title = \'' + this.title + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('More Tuna fish Scoob');
            });
            this.publishedBy = await connection.query('SELECT PublishedBy FROM Game WHERE Title = \'' + this.title + '\'', (err) => {
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
}
