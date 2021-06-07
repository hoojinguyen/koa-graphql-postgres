const _ = require("lodash");
const Router = require("koa-router");
const session = require("koa-session");

const passport = require("./passport-config");
const utils = require("../../utils");
const config = require("../../config");

const authCallback = (ctx, next) => {
  const provider = ctx.params.provider;
  const onAuth = async (err, authData, message) => {
    if (err) {
      return (ctx.body = { oke: false, error: _.get(err, "message") });
    }

    if (!authData) {
      return (ctx.body = { oke: false, error: _.get(message, "message") });
    }

    if (ctx.session.returnTo) {
      ctx.redirect(ctx.session.returnTo);
      ctx.session.returnTo = undefined;
      return;
    }

    const accessToken = utils.generateToken(authData.payload, {});
    const { provider, payload } = authData;
    let accessInfo = { ok: true, access_token: accessToken };
    let info = { provider, ...payload };
    info = _.pick(info, ["id", "email", "name", "role", "provider"]);
    info = _.merge(info, accessInfo);

    return (ctx.body = info);
  };

  if (ctx.query.redirect) {
    ctx.session.returnTo = ctx.query.redirect;
  }

  let options = _.get(config.auth[provider], "passportOptions");
  return passport.authenticate(
    provider,
    _.merge({}, options),
    onAuth
  )(ctx, next);
};

module.exports = {
  attach(router, app) {
    app.use(session({}, app));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(async (ctx, next) => {
      await new Promise(resolve => {
        passport.authenticate("jwt", (err, user) => {
          resolve(user);
          ctx.state.user = user;

          let res = { oke: true, message: "Authentication Success" };
          if (!user) res = { oke: false, message: "Authentication failed" };
          ctx.body = res;
        })(ctx);
      });
      await next();
    });
    const r = new Router();
    // r.get("/:provider/callback", authCallback);
    // r.get("/:provider", authCallback);
    r.post("/:provider", authCallback);
    router.use("/auth", r.routes(), r.allowedMethods());
  }
};
