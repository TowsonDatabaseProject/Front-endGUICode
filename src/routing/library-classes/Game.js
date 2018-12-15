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
var Database_1 = require("./../general-server-classes/Database");
var Game = /** @class */ (function () {
    function Game(libID) {
        if (libID === null) {
            this.title = '';
            this.developedBy = '';
            this.licensedBy = '';
            this.releasedFor = '';
            this.ownedBy = '';
            this.wishedForBy = null;
            this.publishedBy = '';
        }
        this.ownedBy = libID;
        function pullMyInfo() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT Title FROM Game WHERE OwnedBy = \'' + libID + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('We got through it dude');
                                })];
                        case 1:
                            _a.title = _g.sent();
                            _b = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT DevelopedBy FROM Game WHERE Title = \'' + this.title + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('More to come from here Shaggy');
                                })];
                        case 2:
                            _b.developedBy = _g.sent();
                            _c = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT LicensedBy FROM Game WHERE Title = \'' + this.title + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('More bark Scoob');
                                })];
                        case 3:
                            _c.licensedBy = _g.sent();
                            _d = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT ReleasedFor FROM Game WHERE Title = \'' + this.title + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('More mayonnaise scoob');
                                })];
                        case 4:
                            _d.releasedFor = _g.sent();
                            _e = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT WishedForBy FROM Game WHERE Title = \'' + this.title + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('More Tuna fish Scoob');
                                })];
                        case 5:
                            _e.wishedForBy = _g.sent();
                            _f = this;
                            return [4 /*yield*/, Database_1["default"].query('SELECT PublishedBy FROM Game WHERE Title = \'' + this.title + '\';', function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('More carrots Scoob');
                                })];
                        case 6:
                            _f.publishedBy = _g.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        pullMyInfo();
    }
    Game.prototype.getTitle = function () {
        return this.title;
    };
    Game.prototype.getPublisher = function () {
        return this.publishedBy;
    };
    Game.prototype.getDeveloper = function () {
        return this.developedBy;
    };
    Game.prototype.getLicensor = function () {
        return this.licensedBy;
    };
    Game.prototype.getSystems = function () {
        return this.releasedFor;
    };
    Game.prototype.getLibraries = function () {
        return this.ownedBy;
    };
    Game.prototype.getWishedFor = function () {
        return this.wishedForBy;
    };
    Game.prototype.setTitle = function (title) {
        this.title = title;
    };
    Game.prototype.setLibrary = function (ownedBy) {
        this.ownedBy = ownedBy;
    };
    Game.prototype.setWishedFor = function (wishedForBy) {
        this.wishedForBy = wishedForBy;
    };
    Game.prototype.setPublisher = function (publisher) {
        this.publishedBy = publisher;
    };
    Game.prototype.setDeveloper = function (developer) {
        this.developedBy = developer;
    };
    Game.prototype.setLicensor = function (licensor) {
        this.licensedBy = licensor;
    };
    Game.prototype.setSystem = function (system) {
        this.releasedFor = system;
    };
    Game.prototype.addEntry = function () {
        Database_1["default"].query('INSERT INTO Game \(Title, DevelopedBy, PublishedBy, LicensedBy, OwnedBy, ReleasedFor, WishedForBy\) '
            + 'VALUES \(\'' + this.title + '\', \'' + this.developedBy + '\', \'' + this.publishedBy + '\', \'' + this.licensedBy +
            '\', \'' + this.ownedBy + '\', \'' + this.releasedFor + '\', \'' + this.wishedForBy + '\'\);', function (err) {
            if (err) {
                throw err;
            }
            console.log('Successfully added new game into database.');
        });
    };
    return Game;
}());
exports["default"] = Game;
