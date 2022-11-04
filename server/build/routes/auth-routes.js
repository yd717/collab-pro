"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_keys_1 = require("../config.keys");
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var router = express_1.default.Router();
// when login failed, send failed msg
router.get("/login/failed", function (req, res) {
    res.status(401).json({
        isLoggedIn: false,
        message: "user failed to authenticate.",
    });
});
// auth with google+
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile"] }));
router.get("/google/redirect", passport_1.default.authenticate("google", {
    successRedirect: config_keys_1.CLIENT_URL + "/home",
    failureRedirect: "/login/failed",
}));
router.get("/github", passport_1.default.authenticate("github", { scope: ["profile"] }));
router.get("/github/redirect", passport_1.default.authenticate("github", {
    successRedirect: config_keys_1.CLIENT_URL + "/home",
    failureRedirect: "/login/failed",
}));
// auth with twitter
router.get("/twitter", passport_1.default.authenticate("twitter", { scope: ["profile"] }));
router.get("/twitter/redirect", passport_1.default.authenticate("twitter", {
    successRedirect: config_keys_1.CLIENT_URL + "/home",
    failureRedirect: "/login/failed",
}));
exports.default = router;
