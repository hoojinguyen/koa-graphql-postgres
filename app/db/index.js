const knex = require("./knex");

// Modules
const users = require("./users");
const todos = require("./todos");

module.exports = {
  knex,
  users,
  todos,
};
