const { todos } = require("../db");
const { protectedRoute } = require("./context");

const getAllTodo = async ctx => {
  return (ctx.body = await todos.findAll());
};

const getTodoById = async ctx => {
  return (ctx.body = await todos.findOne({ id: ctx.params.id }));
};

const getTodoByUserId = async ctx => {
  return (ctx.body = await todos.findByUserId({ user_id: ctx.params.id }));
};

module.exports = {
  attach(router) {
    router.get("/todo", ctx => protectedRoute("user", getAllTodo, ctx));
    router.get("/todo/:id", ctx => protectedRoute("user", getTodoById, ctx));
    router.get("/todo/user/:id", ctx =>
      protectedRoute("user", getTodoByUserId, ctx)
    );
  }
};
