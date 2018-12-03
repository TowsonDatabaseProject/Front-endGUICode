import * as express from 'express';
import User from './../user-classes/User';
import userProfile from './../user-classes/Profile';
import library from '../library-classes/Library';
import Profile from './../user-classes/Profile';
import PublisherLibrary from '../library-classes/PublisherLibrary';
import AdminUser from '../user-classes/AdminUser';
import Thread from './../social-classes/forum-classes/ForumThread';
import Forum from './../social-classes/forum-classes/Forum';

/**
 * This class sets up or REST API client. We mount all of the roots in this class so that we can eventually
 * utilize them to access the data in the database. This is separate from Angular's UI routing.
 */
class App {
    public express;
    private user: User;
    private thread: Thread;
    private forum: Forum;

    constructor() {
        this.express = express();
        this.user = new User(null);
        this.forum = new Forum();
        this.mountRoutes();
    }

    // Mounts all routes for our application
    private mountRoutes (): void {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Home Page'
            });
        });

        router.param('userID', (req, res, next, userID) => {
            if (this.user.validateUser(req.param.userName, req.param.password)) {
                userID = this.user.getID();
            }
            if (this.user.isAdmin()) {
                this.user = new AdminUser(this.user);
            }
            next();
        });

        router.get('/:userID', (req, res) => {
            res.send(req.param.userID);
        });

        router.get('/:userID/main_page', (req, res) => {

        });

        router.get('/:userID/profile', (req, res) => {
            Profile.setID(this.user.getID());
            res.send(Profile);
        });
        router.get('/:userID/library', (req, res) => {

        });
        router.get('/:console', (req, res) => {

        });
        router.get('/:publisher', (req, res) => {
            // res.send(new PublisherLibrary())
        });
        router.get('/:developer', (req, res) => {

        });
        router.get('/forum', (req, res) => {
            this.thread = new Thread();

        });

        router.param('thread', (req, res, next, thread) => {
            if (this.thread.getThreadInfo(req.param.name)) {
                thread = this.thread.getThreadID();
            }
            next();
        });

        router.get('/forum/:thread', (req, res) => {
            res.json(this.thread.getQuestion);
            res.json(this.thread.getComments);
        });
        this.express.use('/', router);
    }
}

export default new App().express;
