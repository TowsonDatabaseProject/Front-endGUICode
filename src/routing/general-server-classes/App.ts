import * as express from 'express';
import User from './../user-classes/User';
import userProfile from './../user-classes/Profile';
import Profile from './../user-classes/Profile';
import PublisherLibrary from '../library-classes/PublisherLibrary';
import AdminUser from '../user-classes/AdminUser';
import Thread from './../social-classes/forum-classes/ForumThread';
import Forum from './../social-classes/forum-classes/Forum';
import Library from '../library-classes/Library';
import * as sha from 'js-sha512';
import SystemLibrary from './../library-classes/SystemLibrary';
import DeveloperLibrary from './../library-classes/DeveloperLibrary';

/**
 * This class sets up or REST API client. We mount all of the roots in this class so that we can eventually
 * utilize them to access the data in the database. This is separate from Angular's UI routing.
 */
class App {
    public express;
    private user: User;
    private thread: Thread;
    private forum: Forum;
    private id: number;
    private userLibrary: Library;
    private profile: Profile;
    private systemLibrary: SystemLibrary;
    private developerLibrary: DeveloperLibrary;
    private publisherLibrary: PublisherLibrary;

    constructor() {
        this.express = express();
        this.user = new User(null);
        this.forum = new Forum();
        this.id = 0;
        this.profile = new Profile();
        this.mountRoutes();
    }

    // Mounts all routes for our application
    private mountRoutes (): void {
        const router = express.Router();
        // Home page
        router.get('/', (req, res) => {
            res.json({
                message: 'Home Page'
            });
        });
        // Sign up new user
        router.get('/sign-up', (req, res) => {
            this.id++;
            this.user.signUpUser(req.params.userName, req.params.password, req.params.firstName, req.params.lastName,
                sha.sha512('0' + this.id));
        });
        // Defines userID parameter for request
        router.param('userID', (req, res, next, userID) => {
            if (this.user.validateUser(req.params.userName, req.params.password)) {
                req.params.userID = async() => {
                    await this.user.getID();
                };
            }
            if (this.user.isAdmin()) {
                this.user = new AdminUser(this.user);
            }
            next();
        });
        // Get the userID to take user to next webpage
        router.get('/:userID', (req, res, next) => {
            res.send(req.params.userID);
            next();
        });

        router.get('/:userID/main_page', (req, res) => {

        });

        router.get('/:userID/profile', (req, res) => {
            this.profile.setID(this.user.getID());
            res.send(this.profile);
        });
        router.get('/:userID/:library', (req, res) => {
            this.userLibrary = new Library(req.params.library, this.user.getID());
            res.send(this.userLibrary.getGameList());
        });
        router.get('/:systemName', (req, res) => {
            this.systemLibrary = new SystemLibrary(req.params.systemName);
            res.send(this.systemLibrary);
        });
        router.get('/:publisher', (req, res) => {
            this.publisherLibrary = new PublisherLibrary(req.params.publisher);
            res.send(this.publisherLibrary);
        });
        router.get('/:developer', (req, res) => {
            this.developerLibrary = new DeveloperLibrary(req.params.developer);
            res.send(this.developerLibrary);
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
