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

    public getThreadInfo(titleOfThread: String) {
        this.title = titleOfThread;
        this.id = connection.query('SELECT TopicID FROM Topics WHERE Title = \'' + this.title + '\'', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got thread ID');
        });
        this.question = connection.query('SELECT Body FROM Topics WHERE TopicID = \'' + this.id + '\'', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got thread question');
        });
        this.comments.fill(connection.query('SELECT Message FROM Comments WHERE ID = \'' + this.id + '\'', (err) => {
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
