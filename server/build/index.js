"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var passport_1 = __importDefault(require("passport"));
var chalk_1 = __importDefault(require("chalk"));
var config_keys_1 = require("./config.keys");
var auth_routes_1 = __importDefault(require("./routes/auth-routes"));
var api_routes_1 = __importDefault(require("./routes/api-routes"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var http_1 = __importDefault(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
var socket_io_service_1 = __importDefault(require("./service/socket-io-service"));
var express_session_1 = __importDefault(require("express-session"));
require("./service/passport");
// import cookieSession from "cookie-session";
var app = express_1.default();
var httpServer = new http_1.default.Server(app);
app.use(cors_1.default({
    origin: config_keys_1.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type",
    credentials: true, // allow session cookies from browser to pass throught
}));
app.set("trust proxy", 1);
app.use(express_1.default.json());
app.use(cookie_parser_1.default()); // parse cookies
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_session_1.default({
    secret: config_keys_1.COOKIE_KEYS,
    name: "caucus-session",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: true,
        httpOnly: true,
        // 2nd change.
        secure: false,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session()); // deserialize cookie from the browser
app.use("/auth", auth_routes_1.default);
app.use("/api", api_routes_1.default);
socket_io_service_1.default(httpServer);
app.use("/", function (req, res) {
    return res.send("\n  <h1>Server is Running :)))</h1>\n  <div>The website is now hosted on netlify\n    <a href=\"https://caucus.netlify.app/\">https://caucus.netlify.app/</a>\n  </div>\n");
});
httpServer.listen(config_keys_1.port, function () { return console.log(chalk_1.default.blueBright("Express Server listening to port " + config_keys_1.port)); });
