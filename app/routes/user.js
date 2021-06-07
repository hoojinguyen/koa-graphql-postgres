const { users } = require("../db");
const { protectedRoute } = require("./context");

const getAllUsers = async ctx => {
  return (ctx.body = await users.findAll());
};

const getUserById = async ctx => {
  return (ctx.body = await users.findOne({ id: ctx.params.id }));
};

module.exports = {
  attach(router) {
    router.get("/user", ctx => protectedRoute("admin", getAllUsers, ctx));
    router.get("/user/:id", ctx => protectedRoute("user", getUserById, ctx));
  }
};
