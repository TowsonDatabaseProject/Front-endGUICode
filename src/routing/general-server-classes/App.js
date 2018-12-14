"use strict";
exports.__esModule = true;
var express = require("express");
var User_1 = require("./../user-classes/User");
var Profile_1 = require("./../user-classes/Profile");
var PublisherLibrary_1 = require("../library-classes/PublisherLibrary");
var AdminUser_1 = require("../user-classes/AdminUser");
var ForumThread_1 = require("./../social-classes/forum-classes/ForumThread");
var Forum_1 = require("./../social-classes/forum-classes/Forum");
var Library_1 = require("../library-classes/Library");
var sha = require("js-sha512");
var SystemLibrary_1 = require("./../library-classes/SystemLibrary");
var DeveloperLibrary_1 = require("./../library-classes/DeveloperLibrary");
var Game_1 = require("./../library-classes/Game");
/**
 * This class sets up or REST API client. We mount all of the roots in this class so that we can eventually
 * utilize them to access the data in the database. This is separate from Angular's UI routing.
 */
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.user = new User_1["default"](null);
        this.forum = new Forum_1["default"]();
        this.id = 0;
        this.profile = new Profile_1["default"]();
        this.thread = new ForumThread_1["default"]();
        this.mountRoutes();
    }
    // Mounts all routes for our application
    App.prototype.mountRoutes = function () {
        var _this = this;
        var router = express.Router();
        // Home page
        router.get('/', function (req, res) {
            res.json({
                message: 'Home Page'
            });
        });
        // Sign up new user
        router.put('/sign-up', function (req, res) {
            _this.id++;
            _this.user.signUpUser(req.params.userName, req.params.password, req.params.firstName, req.params.lastName, sha.sha512('0' + _this.id));
        });
        // Defines userID parameter for request
        router.param('userID', function (req, res, next, userID) {
            if (_this.user.validateUser(req.body['Username'], req.body['password'])) {
                req.params.userID = _this.user.getID();
            }
            if (_this.user.isAdmin()) {
                _this.user = new AdminUser_1["default"](_this.user);
            }
            next();
        });
        // Get the userID to take user to next webpage
        router.get('user/:userID', function (req, res, next) {
            res.send(req.params.userID);
            next();
        });
        router.get('user/:userID/main_page', function (req, res) {
        });
        router.get('user/:userID/profile', function (req, res) {
            _this.profile.setID(_this.user.getID());
            res.send(JSON.stringify(_this.profile));
        });
        router.put('user/:userID/profile/:newLibrary', function (req, res) {
            _this.userLibrary = new Library_1["default"](req.body['name'], req.body['id']);
            _this.userLibrary.createNewLibrary(req.body['libId']);
            res.json({
                'Success': true
            });
        });
        router.put('user/:userID/profile/:library/add-game', function (req, res) {
            var game = JSON.parse(req.body);
            var newGame = new Game_1["default"](null);
            newGame.setTitle(game.title);
            newGame.setDeveloper(game.developer);
            newGame.setLibrary(game.library);
            newGame.setPublisher(game.publisher);
            newGame.setLicensor(game.licensor);
            newGame.setSystem(game.system);
            if (!(game.wish === undefined)) {
                newGame.setWishedFor(game.wish);
            }
            _this.userLibrary = new Library_1["default"](req.body['name'], req.body['id']);
            _this.userLibrary.addGame(newGame);
            res.json({
                'Success': true
            });
        });
        router.get('user/:userID/profile/:library', function (req, res) {
            _this.userLibrary = new Library_1["default"](req.body['name'], _this.user.getID());
            res.send(JSON.stringify(_this.userLibrary.getGameList()));
        });
        router.put('/:user/newGame', function (req, res) {
            var game = JSON.parse(req.body);
            var newGame = new Game_1["default"](null);
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
        router.get('/:systemName', function (req, res) {
            _this.systemLibrary = new SystemLibrary_1["default"](req.body['System Name']);
            res.send(JSON.stringify(_this.systemLibrary));
        });
        router.get('/:publisher', function (req, res) {
            _this.publisherLibrary = new PublisherLibrary_1["default"](req.body['name']);
            res.send(JSON.stringify(_this.publisherLibrary));
        });
        router.get('/:developer', function (req, res) {
            _this.developerLibrary = new DeveloperLibrary_1["default"](req.body['name']);
            res.send(JSON.stringify(_this.developerLibrary));
        });
        router.get('/forum', function (req, res) {
            res.send(JSON.stringify(_this.thread.getAllTopics()));
        });
        router.param('thread', function (req, res, next, thread) {
            if (_this.thread.getThreadInfo(req.param.name)) {
                thread = _this.thread.getThreadID();
            }
            next();
        });
        router.put('/forum/new-thread', function (req, res) {
            _this.thread.createThread(req.body['message'], req.body['id'], req.body['title']);
            res.json({
                'Success': true
            });
        });
        router.get('/forum/:thread', function (req, res) {
            res.send(_this.thread.getQuestion());
            res.send(_this.thread.getComments());
        });
        this.express.use('/', router);
    };
    return App;
}());
exports["default"] = new App().express;
