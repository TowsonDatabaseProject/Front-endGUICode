import connection from './../../general-server-classes/Database';
import { async } from '@angular/core/testing';
import User from './../../user-classes/User';

export default class Comment {
    private message: String;
    private id: String;
    private threadId: String;
    private userId: String;
    private postId: String;
    private isPost: boolean;
    private isThread: boolean;

    constructor(id: String, isPost: boolean) {
        if (isPost) {
            this.id = id;
            this.isPost = isPost;
            this.isThread = false;
        } else {
            this.id = id;
            this.isPost = isPost;
            this.isThread = true;
        }
    }

    public async initialize() {
        if (this.isPost) {
            this.postId = await connection.query('SELECT PostID FROM Comments WHERE CommentID = \'' + this.id + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('More Info');
            });
        } else {
            this.threadId = await connection.query('SELECT ThreadID FROM Comments WHERE CommentID = \'' + this.id + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('YAAAAAASSSSSS');
            });
        }
        this.message = await connection.query('SELECT Message FROM Comments WHERE CommentID = \'' + this.id + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('More Info got');
        });
        this.userId = await connection.query('SELECT UserID FROM Comments WHERE CommentID = \'' + this.id + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('AHHHHHHHHHHHHH');
        });
    }

    public getID() {
        return this.id;
    }

    public getUserID() {
        return this.userId;
    }

    public getMessage() {
        return this.message;
    }

    /**
     * This method creates the initial comment and sends it to be stored in the database.
     * @param message - message of the comment the user is posting.
     * @param user - User object that is making the post. Will use more of object when it gets displayed.
     * @param id - ID of the comment itself.
     * @param isPost - Boolean value that tells us whether the comment is on a thread or a post.
     * @param parentId - The ID of the post/thread we are commenting on.
     */
    public async postComment(message: String, user: User, id: String, isPost: boolean, parentId: String) {
        if (isPost) {
            await connection.query('INSERT INTO Comments \( CommentID, Message, PostID, UserID \)'
            + ' VALUES \( \'' + id + '\', \'' + message + '\', \'' + parentId, '\', \'' + user.getID() + '\'\);', (err) => {
                if (err) {
                    throw err;
                }
                console.log('Posted Comment successfully');
            });
        } else {
            await connection.query('INSERT INTO Comments \( CommentID, Message, ThreadID, UserID \)'
            + ' VALUES \( \'' + id + '\', \'' + message + '\', \'' + parentId, '\', \'' + user.getID() + '\'\);', (err) => {
                if (err) {
                    throw err;
                }
                console.log('Posted Comment successfully');
            });
        }
    }
}
