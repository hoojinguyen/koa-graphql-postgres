const knex = require("./knex");

const users = () => knex("users");

const findOne = cond => {
  return users()
    .select()
    .where(cond)
    .first();
};

const findAll = () => {
  return users().select();
};

const save = async values => {
  const [user] = await users()
    .insert(values)
    .returning("*");
  return user;
};

const update = async (id, values) => {
  const [user] = await users()
    .where({ id })
    .update(values)
    .returning("*");
  return user;
};

module.exports = { findOne, findAll, save, update };
