
import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { Strategy, ExtractJwt } from "passport-jwt";
import { General } from "./../config/common";
import { model as User, IUser } from "../models/user-model";
import { resolve } from "url";

export class AuthController {

    public initialize(): any {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    public async signup(name: string, userName: string, password: string): Promise<void> {

        let user: any = await User.findOne({ "username": userName }).exec();

        if (user === null) {
            const newUser: any = new User({
                name: name,
                username: userName,
                password: password
            });
            // get salt and hash
            var saltAndHash: any = await newUser.getHashForPassword(password);
            newUser.password = saltAndHash.hash;
            newUser.salt = saltAndHash.salt;
            // save the user
            newUser.save();
        }
    }

    public async signin(req: any, res: any): Promise<void> {
        try {
            req.checkBody("username", "Invalid username").notEmpty();
            req.checkBody("password", "Invalid password").notEmpty();

            let errors: any = req.validationErrors();
            if (errors) {
                throw errors;
            }

            let user: IUser = await User.findOne({ "username": req.body.username }).exec();

            if (user === null) {
                res.status(401).json({ "message": "Invalid credentials" });
                return;
            }

            let success: any = await user.comparePassword(req.body.password);
            if (success === false) {
                res.status(401).json({ "message": "Invalid credentials" });
                return;
            }

            const token: any = this.genToken(user);

            res.status(200).json(token);

        } catch (err) {
            res.status(401).json({ "message": "Invalid credentials", "errors": err });
        }
    }

    public getUsers (req: Request, res: Response): void {
        // const common: Common = new Common();
        // const token: any = common.getToken(req.headers);

        // if (!token) {
        //     res.status(403).send({success: false, msg: "Unauthorized."});
        // }
        const tt: number = 10;
    }

    public updateUser (req: Request, res: Response): void {
        const tt: number = 10;
    }

    public deleteUser (req: Request, res: Response): void {
        const tt: number = 10;
    }

    private genToken(user: IUser): Object {
        let expires: any = moment().utc().add({ days: 1 }).unix();
        let token: any = jwt.encode({
            exp: expires,
            username: user.username
        }, General.Secret);

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            user: user._id
        };
    }

    private getStrategy (): Strategy {
        const params: any = {
            secretOrKey: General.Secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            passReqToCallback: true
        };

        return new Strategy(params, (req, payload: any, done) => {
            User.findOne({ "username": payload.username }, (err, user) => {
                /* istanbul ignore next: passport response */
                if (err) {
                    return done(err);
                }
                /* istanbul ignore next: passport response */
                if (user === null) {
                    return done(null, false, { message: "The user in the token was not found" });
                }

                return done(null, { _id: user._id, username: user.username });
            });
        });
    }
}
