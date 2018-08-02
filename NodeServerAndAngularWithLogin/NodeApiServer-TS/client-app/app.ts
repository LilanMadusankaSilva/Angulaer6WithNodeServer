
import { MongoDb, Url, General, Session } from "./config/common";
import { Routes } from "./routes/routes";
import { AuthController } from "./controllers/auth-controller";

import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as appStatus from "./config/appstatus";

const session: any = require("express-session");
const expressValidator: any = require("express-validator");

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    private auth: AuthController = new AuthController();

    constructor() {
        this.app = express();

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

        // allow cros orgin for angular app
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", Url.CrossOriginUrl);
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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