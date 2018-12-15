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
var util_1 = require("util");
var User = /** @class */ (function () {
    function User(user) {
        if (user === null) {
            this.username = '';
            this.id = null;
            this.adminStatus = false;
        }
        else {
            this.username = user.username;
            this.id = user.id;
            this.adminStatus = this.adminStatus;
        }
    }
    User.prototype.validateUser = function (currentName, currentPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Database_1["default"].query('SELECT Password FROM User WHERE Username = \'' + currentName + '\';', function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 1];
                                        throw err;
                                    case 1:
                                        if (!(result === currentPassword)) return [3 /*break*/, 3];
                                        this.username = currentName;
                                        _a = this;
                                        return [4 /*yield*/, Database_1["default"].query('SELECT UserID FROM User WHERE Username = \'' + currentName + '\';', function (error) {
                                                if (error) {
                                                    throw error;
                                                }
                                                // if we did not get an error, then we check if they are an admin or not.
                                                _this.setAdmin();
                                                console.log('ID got');
                                            })];
                                    case 2:
                                        _a.id = _b.sent();
                                        _b.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        // If the id has been set, then we will return true.
                        return [2 /*return*/, !util_1.isNull(this.id)];
                }
            });
        });
    };
    User.prototype.signUpUser = function (newUsername, newPassword, firstName, lastName, id) {
        return __awaiter(this, void 0, void 0, function () {
            var userArray;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.username = newUsername;
                        return [4 /*yield*/, Database_1["default"].query('SELECT Username FROM User;', function (err) {
                                if (err) {
                                    throw err;
                                }
                                console.log('Got the usernames.');
                            }, 0, -1)];
                    case 1:
                        userArray = _a.sent();
                        userArray.forEach(function (value) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!!(this.username === value)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Database_1["default"].query('INSERT INTO User (Username, Password, Fname, Lname, UserID) VALUES \(\''
                                                + this.username + ', ' + newPassword + ', ' + firstName + ', ' + lastName + ', ' + id + '\'\);')];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        console.log('Username already exists.');
                                        return [2 /*return*/, 'Username already exists, try again'];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, !util_1.isNull(this.id)];
                }
            });
        });
    };
    // Getter for the ID of the user
    User.prototype.getID = function () {
        return this.id;
    };
    User.prototype.setAdmin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adminArray;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Database_1["default"].query('SELECT AdminID FROM Admin;', function (err) {
                            if (err) {
                                throw err;
                            }
                            adminArray.forEach(function (value) {
                                if (value === _this.id) {
                                    _this.adminStatus = true;
                                    // lets leave the loop
                                }
                            });
                        })];
                    case 1:
                        adminArray = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.isAdmin = function () {
        return this.adminStatus;
    };
    User.prototype.getUsername = function () {
        return this.username;
    };
    return User;
}());
exports["default"] = User;
