
import { MongoDb, Url, General, Session } from "./config/common";
import { Routes } from "./routes/routes";
import { AuthController } from "./controllers/auth-controller";

import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as appStatus from "./config/appstatus";

const session: any = require("express-session");
const expressValidator: any = require("express-validator");
const argv = require("minimist")(process.argv.slice(2));

class App {

    public app: express.Application;
    public subpath: express.Application;
    public routePrv: Routes = new Routes();
    private auth: AuthController = new AuthController();

    constructor() {
        this.app = express();
        this.subpath = express();

        this.config();

        this.routePrv.routes(this.app);

        this.mongoSetup();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        this.app.use(expressValidator());

        // authentication
        this.app.use(this.auth.initialize());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // swagger *******************************
        this.app.use("/v1", this.subpath);
        var swagger = require('swagger-node-express').createNew(this.subpath);
        this.app.use(express.static('dist'));
        swagger.setApiInfo({
            title: "example API",
            description: "API to do something, manage something...",
            termsOfServiceUrl: "",
            contact: "lilans@lm.com",
            license: "",
            licenseUrl: ""
        });

        // serve swagger html
        this.app.get('/', function (req, res) {
            res.sendFile(__dirname + '/dist/index.html');
        });

        // Set api-doc path
        swagger.configureSwaggerPaths('', 'api-docs', '');

        // Configure the API domain
        var domain = 'localhost';
        if (argv.domain !== undefined)
            domain = argv.domain;
        else
            console.log('No --domain=xxx specified, taking default hostname "localhost".')

        // Configure the API port
        var port = 3000;
        if (argv.port !== undefined)
            port = argv.port;
        else
            console.log('No --port=xxx specified, taking default port ' + port + '.')

        // Set and display the application URL
        var applicationUrl = 'http://' + domain + ':' + port;
        console.log('snapJob API running on ' + applicationUrl);


        swagger.configure(applicationUrl, '1.0.0');
        // ********************************

        // allow cros orgin for angular app
        this.app.use((req, res, next) => {
            var allowedOrigins = ["http://localhost:3000", Url.CrossOriginUrl];
            var origin = req.headers.origin;
            if (allowedOrigins.indexOf(<any>origin) > -1) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            //res.header("Access-Control-Allow-Origin", Url.CrossOriginUrl);

            if (req.method.toUpperCase() === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,x-access-token,Content-Type,Authorization");
                res.status(204).send();
                return;
            }
            next();
        });

        // enable session
        this.app.use(session({
            secret: General.Secret,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true, maxAge: 50000 }
        }));

        this.app.all(Url.BaseUrl + "*", (req, res, next) => {
            if (req.path.includes(Url.SignInUrlPrefix)) {
                return next();
            }

            // tslint:disable-next-line:no-string-literal
            const token: any = req.headers.authorization;
            return this.auth.authenticate((err, user, info) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    if (info.name === "TokenExpiredError") {
                        return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
                    } else {
                        return res.status(401).json({ message: info.message });
                    }
                }

                // this.app.set("user", user);
                appStatus.default.setSession(req, Session.User, user);
                return next();
            })(req, res, next);
        });
    }

    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(MongoDb.Url).then((mongos) => {
            // create admin user
            this.auth.signup("Lilan silva", "lilan", "12345678@#");
        });
    }
}

export default new App().app;