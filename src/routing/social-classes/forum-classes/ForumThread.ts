import connection from './../../general-server-classes/Database';
import { isNull } from 'util';

export default class ForumThread {
    private title: String;
    private id: String;
    private question: String;
    private comments: String[];

    constructor() {
        this.title = '';
        this.id = null;
    }

    public async getThreadInfo(titleOfThread: String) {
        this.title = titleOfThread;
<<<<<<< HEAD
        this.id = connection.query('SELECT TopicID FROM Topics WHERE Title = \'' + this.title + '\'', (err) => {
=======
        this.id = await connection.query('SELECT TopicID FROM Topics WHERE Title = ' + this.title, (err) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            if (err) {
                throw err;
            }
            console.log('Got thread ID');
        });
<<<<<<< HEAD
        this.question = connection.query('SELECT Body FROM Topics WHERE TopicID = \'' + this.id + '\'', (err) => {
=======
        this.question = await connection.query('SELECT Body FROM Topics WHERE TopicID = ' + this.id, (err) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            if (err) {
                throw err;
            }
            console.log('Got thread question');
        });
<<<<<<< HEAD
        this.comments.fill(connection.query('SELECT Message FROM Comments WHERE ID = \'' + this.id + '\'', (err) => {
=======
        this.comments.fill(await connection.query('SELECT Message FROM Comments WHERE ID = ' + this.id, (err) => {
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
            if (err) {
                throw err;
            }
            console.log('Got comments for thread');
        }), 0, -1);
        return !isNull(this.id);
    }

    public getThreadID(): String {
        return this.id;
    }

    public getQuestion(): String {
        return this.question;
    }

    public getComments(): String[] {
        return this.comments;
    }
}
