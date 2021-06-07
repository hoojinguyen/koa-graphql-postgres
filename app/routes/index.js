const auth = require("./auth");
const graphql = require("./graphql");
const user = require("./user");
const todo = require("./todo");

module.exports = {
  modules: [auth, graphql, user, todo]
};
