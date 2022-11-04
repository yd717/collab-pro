"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = require("passport-google-oauth20");
var passport_twitter_1 = require("passport-twitter");
var passport_github_1 = require("passport-github");
var config_keys_1 = require("../config.keys");
var db_connection_1 = __importDefault(require("./db_connection"));
var config_keys_2 = require("../config.keys");
var date = new Date().toISOString();
passport_1.default.serializeUser(function (user, done) {
    console.log("inside serialzie");
    console.log(user);
    done(null, user);
});
passport_1.default.deserializeUser(function (response, done) { return __awaiter(void 0, void 0, void 0, function () {
    var userRows, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("inside derserialze");
                console.log(response);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_connection_1.default("oauth").select().where({ user_id: response.user_id })];
            case 2:
                userRows = _a.sent();
                user = userRows[0];
                done(null, user);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
passport_1.default.use(new passport_github_1.Strategy({
    // options for github strategy
    clientID: config_keys_1.GITHUB_KEY.clientID,
    clientSecret: config_keys_1.GITHUB_KEY.clientSecret,
    callbackURL: config_keys_2.SERVER_URL + "/auth/github/redirect",
}, function (accessToken, refreshToken, profile, done) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUserRows, currentUser, newUser, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, db_connection_1.default("oauth").select().where({ user_id: profile.id })];
            case 1:
                currentUserRows = _a.sent();
                currentUser = currentUserRows[0];
                if (!currentUser) return [3 /*break*/, 2];
                done(null, currentUser);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, db_connection_1.default("oauth")
                    .insert({
                    user_id: profile.id,
                    name: profile.displayName,
                    image_link: profile.photos ? profile.photos[0].value : "",
                    create_time: date,
                    oauth_provider: profile.provider,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                })
                    .returning("*")];
            case 3:
                newUser = _a.sent();
                done(null, newUser[0]);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                console.error(err_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); }));
// Goolge Strategy to Login a user
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_keys_1.GOOGLE_KEY.clientID,
    clientSecret: config_keys_1.GOOGLE_KEY.clientSecret,
    callbackURL: config_keys_2.SERVER_URL + "/auth/google/redirect",
}, function (accessToken, refreshToken, profile, done) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUserRows, currentUser, newUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, db_connection_1.default("oauth").select().where({ user_id: profile.id })];
            case 1:
                currentUserRows = _a.sent();
                currentUser = currentUserRows[0];
                console.log("inside google");
                console.log(currentUser);
                if (!currentUser) return [3 /*break*/, 2];
                done(undefined, currentUser);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, db_connection_1.default("oauth")
                    .insert({
                    user_id: profile.id,
                    name: profile.displayName,
                    image_link: profile.photos ? profile.photos[0].value : "",
                    create_time: date,
                    oauth_provider: profile.provider,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                })
                    .returning("*")];
            case 3:
                newUser = _a.sent();
                done(undefined, newUser[0]);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                console.error(err_3);
                done(err_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); }));
// TWITTER Strategy to Login as a user
passport_1.default.use(new passport_twitter_1.Strategy({
    consumerKey: config_keys_1.TWITTER_KEY.consumerKey,
    consumerSecret: config_keys_1.TWITTER_KEY.consumerSecret,
    callbackURL: config_keys_2.SERVER_URL + "/auth/twitter/redirect",
}, function (accessToken, refreshToken, profile, done) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUserRows, currentUser, newUser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, db_connection_1.default("oauth").select().where({ user_id: profile.id })];
            case 1:
                currentUserRows = _a.sent();
                currentUser = currentUserRows[0];
                if (!currentUser) return [3 /*break*/, 2];
                done(null, currentUser);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, db_connection_1.default("oauth")
                    .insert({
                    user_id: profile.id,
                    name: profile.displayName,
                    image_link: profile.photos ? profile.photos[0].value : "",
                    create_time: date,
                    oauth_provider: profile.provider,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                })
                    .returning("*")];
            case 3:
                newUser = _a.sent();
                done(null, newUser[0]);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                console.error(err_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); }));
