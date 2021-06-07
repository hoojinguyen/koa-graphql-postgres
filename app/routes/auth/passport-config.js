const _ = require("lodash");
const passport = require("koa-passport");

const config = require("../../config");
const db = require("../../db");
const utils = require("../../utils");

passport.serializeUser(function(user, done) {
  done(null, _.omit(user, "password"));
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy({ usernameField: "email" }, async function(
    email,
    password,
    done
  ) {
    try {
      let user = await db.users.findOne({ email });
      if (!user || !user.password) {
        return done(null, false, { message: "This email is not registered" });
      }
      let verify = await utils.verifyPassword(password, user.password);
      if (!verify) {
        return done(null, false, { message: "Incorrect credentials" });
      }
      return done(null, { provider: "local", payload: user });
    } catch (err) {
      return done(err, false);
    }
  })
);

const passportJwt = require("passport-jwt");
const JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt;
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter("access_token"),
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      secretOrKey: config.server.secretKey
    },
    async function(payload, done) {
      if (!payload.id) {
        done(new Error("invalid authorization token"));
      } else {
        return done(null, { provider: "jwt", ...payload });
      }
    }
  )
);

module.exports = passport;
