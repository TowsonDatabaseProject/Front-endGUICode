"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Database_1 = require("./../../general-server-classes/Database");
var Post = /** @class */ (function () {
    // feedId is not actually the id for the feed, but the group_id
    function Post(feedId) {
        this.feedId = feedId;
        function setUpClass() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT BelongsTo FROM Post WHERE UserID = \'' + feedId + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('We did it scoob');
                                })];
                        case 1:
                            _a.ownerId = _f.sent();
                            _b = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT UserName FROM Post WHERE OwnerID = \'' + this.ownerId + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('We too good scoob');
                                })];
                        case 2:
                            _b.ownerUsername = _f.sent();
                            _c = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT Message FROM Post WHERE FeedID = \'' + feedId + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('Here\'s the peanut butter scoob');
                                })];
                        case 3:
                            _c.message = _f.sent();
                            _d = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT Time FROM Post WHERE FeedID = \'' + feedId + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('MOAR PEANUT BUTTER SCOOBY DOO');
                                })];
                        case 4:
                            _d.timePosted = _f.sent();
                            _e = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT BelongsTo FROM Post WHERE FeedID = \'' + feedId + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('Gorgonzola now scoob');
                                })];
                        case 5:
                            _e.belongsTo = _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        setUpClass();
    }
    Post.prototype.getPosts = function () {
        return this;
    };
    Post.prototype.makePost = function (message, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.message = message;
                        this.ownerId = user.getID();
                        return [4 /*yield*/, Database_1["default"].query('INSERT INTO Posts \(MessageID, BelongsTo, Message, FeedID, TimeOfPost, UserName\)'
                                + ' VALUES \( \'' + this.id + '\', \'' + this.ownerId + '\', \'' + message + '\', \'' + this.ownerId + '\', \'' + this.timePosted
                                + '\', \'' + user.getUsername() + '\'\);')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Post.prototype.getUser = function () {
        return this.ownerId;
    };
    Post.prototype.getUsername = function () {
        return this.ownerUsername;
    };
    Post.prototype.getPostId = function () {
        return this.id;
    };
    return Post;
}());
exports["default"] = Post;
