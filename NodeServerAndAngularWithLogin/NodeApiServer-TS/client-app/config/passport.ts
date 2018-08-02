
import { General } from "./common";
import { UserSchema } from "models/user-model";

var JwtStrategy: any = require("passport-jwt").Strategy;
var ExtractJwt: any = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  var opts: any = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = General.Secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    UserSchema.findOne({id: jwt_payload.id}, (err, user) => {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};