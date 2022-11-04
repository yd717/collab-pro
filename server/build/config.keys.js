"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JDOODLE = exports.TWITTER_KEY = exports.GOOGLE_KEY = exports.GITHUB_KEY = exports.DATABASE_URL = exports.JDOODLE_URL = exports.COOKIE_KEYS = exports.SERVER_URL = exports.CLIENT_URL = exports.port = exports.PROD = void 0;
// .dotenv why you do me dirty like this D:
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PROD = JSON.parse(process.env.PROD || "false");
exports.port = parseInt(process.env.PORT) || 5000;
exports.CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
exports.SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";
exports.COOKIE_KEYS = [process.env.COOKIE_KEYS || "password"];
exports.JDOODLE_URL = process.env.JDOODLE_URL || "https://api.jdoodle.com/v1";
// check if URI is correct for you format
// postgresql://<User>:<Passward>@<host-name>:<port-number>/<db-name>s
exports.DATABASE_URL = process.env.DATABASE_URL || "postgresql://localhost:5432/caucus_db";
exports.GITHUB_KEY = {
    clientID: process.env.GITHUB_KEY_CLIENTID || " ",
    clientSecret: process.env.GITHUB_KEY_CLIENTSECRET || " ",
};
exports.GOOGLE_KEY = {
    clientID: process.env.GOOGLE_KEY_CLIENTID || " ",
    clientSecret: process.env.GOOGLE_KEY_CLIENTSECRET || " ",
};
exports.TWITTER_KEY = {
    consumerKey: process.env.TWITTER_KEY_CONSUMERKEY || " ",
    consumerSecret: process.env.TWITTER_KEY_CONSUMERSECRET || " ",
};
exports.JDOODLE = {
    clientID: process.env.JDOODLE_CLIENTID || "da358ecadea106b681e17e6dd1194863",
    clientSecret: process.env.JDOOLDE_CLIENTSECRET || "7b69d6ce85668cb6fe5dbd61d37433bf3ffe31c14fed906833faad7e2593f5ca",
};
