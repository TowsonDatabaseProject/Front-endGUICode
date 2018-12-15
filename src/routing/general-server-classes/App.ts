import * as express from 'express';
import User from './../user-classes/User';
import Profile from './../user-classes/Profile';
import PublisherLibrary from '../library-classes/PublisherLibrary';
import AdminUser from '../user-classes/AdminUser';
import Thread from './../social-classes/forum-classes/ForumThread';
import Forum from './../social-classes/forum-classes/Forum';
import Library from '../library-classes/Library';
import * as sha from 'js-sha512';
import SystemLibrary from './../library-classes/SystemLibrary';
import DeveloperLibrary from './../library-classes/DeveloperLibrary';
import Game from './../library-classes/Game';
import Feed from './../social-classes/feed-classes/Feed';
import Post from './../social-classes/feed-classes/Post';
import Like from './../social-classes/feed-classes/Like';
import { isNull } from '@angular/compiler/src/output/output_ast';

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
    private libId: Number;
    private feed: Feed;

    constructor() {
        this.express = express();
        this.user = new User(null);
        this.forum = new Forum();
        this.id = 0;
        this.profile = new Profile();
        this.thread = new Thread();
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
        router.put('/sign-up', (req, res) => {
            this.id++;
            this.user.signUpUser(req.params.userName, req.params.password, req.params.firstName, req.params.lastName,
                sha.sha512('0' + this.id));
        });
        // Defines userID parameter for request
        router.param('userID', (req, res, next, userID) => {
            if (this.user.validateUser(req.body['Username'], req.body['password'])) {
                req.params.userID = this.user.getID();
            }
            if (this.user.isAdmin()) {
                this.user = new AdminUser(this.user);
            }
            next();
        });
        // Get the userID to take user to next webpage
        router.get('user/:userID', (req, res, next) => {
            res.send(req.params.userID);
            next();
        });

        router.get('user/:userID/main_page', (req, res) => {

        });

        router.get('user/:userID/profile', (req, res) => {
            this.profile.setID(this.user.getID());
            res.send(JSON.stringify(this.profile));
        });
        router.put('user/:userID/profile/:newLibrary', (req, res) => {
            this.userLibrary = new Library(req.body['name'], req.body['id']);
            this.userLibrary.createNewLibrary(req.body['libId']);
            res.json({
                Success: true
            });
        });
        router.put('user/:userID/profile/:library/add-game', (req, res) => {
            const game = JSON.parse(req.body);
            const newGame: Game = new Game(null);
            newGame.setTitle(game.title);
            newGame.setDeveloper(game.developer);
            newGame.setLibrary(game.library);
            newGame.setPublisher(game.publisher);
            newGame.setLicensor(game.licensor);
            newGame.setSystem(game.system);
            if (!(game.wish === undefined)) {
                newGame.setWishedFor(game.wish);
            }
            this.userLibrary = new Library(req.body['name'], req.body['id']);
            this.userLibrary.addGame(newGame);
            res.json({
                Success: true
            });
        });
        router.get('user/:userID/profile/:library', (req, res) => {
            this.userLibrary = new Library(req.body['name'], this.user.getID());
            res.send(JSON.stringify(this.userLibrary.getGameList()));
        });
        router.put('/:user/newGame', (req, res) => {
            const game = JSON.parse(req.body);
            const newGame: Game = new Game(null);
            newGame.setTitle(game.title);
            newGame.setDeveloper(game.developer);
            newGame.setLibrary(game.library);
            newGame.setPublisher(game.publisher);
            newGame.setLicensor(game.licensor);
            newGame.setSystem(game.system);
            if (!(game.wish === undefined)) {
                newGame.setWishedFor(game.wish);
            }
            newGame.addEntry();
            res.send('Successfully added game entry!');
        });
        router.get('/:systemName', (req, res) => {
            this.systemLibrary = new SystemLibrary(req.body['System Name']);
            res.send(JSON.stringify(this.systemLibrary));
        });
        router.get('/:publisher', (req, res) => {
            this.publisherLibrary = new PublisherLibrary(req.body['name']);
            res.send(JSON.stringify(this.publisherLibrary));
        });
        router.get('/:developer', (req, res) => {
            this.developerLibrary = new DeveloperLibrary(req.body['name']);
            res.send(JSON.stringify(this.developerLibrary));
        });
        router.get('/forum', (req, res) => {
            res.send(JSON.stringify(this.thread.getAllTopics()));
        });

        router.param('thread', (req, res, next, thread) => {
            if (this.thread.getThreadInfo(req.param.name)) {
                thread = this.thread.getThreadID();
            }
            next();
        });
        router.put('/forum/new-thread', (req, res) => {
            this.thread.createThread(req.body['message'], req.body['id'], req.body['title']);
            res.json({
                'Success' : true
            });
        });
        router.get('/forum/:thread', (req, res) => {
            res.send(this.thread.getQuestion());
            res.send(this.thread.getComments());
        });
        this.express.use('/', router);
    }
}

export default new App().express;
