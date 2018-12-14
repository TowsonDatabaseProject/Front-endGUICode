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
        this.id = await connection.query('SELECT TopicID FROM Topics WHERE Title = \'' + this.title + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got thread ID');
        });
        this.question = await connection.query('SELECT Message FROM Topics WHERE TopicID = \'' + this.id + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got thread question');
        });
        this.comments = await connection.query('SELECT Message FROM Comments WHERE CommentID = \'' + this.id + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got comments for thread');
        });
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

    public async createThread(message: String, id: String, title: String) {
        await connection.query('INSERT INTO Topics (ThreadID, TopicTitle, Message)'
        + ' VALUES (\'' + id + '\', \'' + title + '\', \'' + message + '\');', (err) => {
            if (err) {
                throw err;
            }
            console.log('Inserted new Thread into Forum');
        });
    }

    public async getAllTopics() {
        return await connection.query('SELECT TopicTitle FROM Topics;', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got all topics');
        });
    }
}
