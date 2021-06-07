const knex = require("./knex");

const todos = () => knex("todos");

const findOne = cond => {
  return todos()
    .select()
    .where(cond)
    .first();
};

const findAll = () => {
  return todos().select();
};

const findByUserId = cond => {
  return todos()
    .select()
    .where(cond);
};

const save = async values => {
  const [todo] = await todos()
    .insert(values)
    .returning("*");
  return todo;
};

const update = async (id, values) => {
  const [todo] = await todos()
    .where({ id })
    .update(values)
    .returning("*");
  return todo;
};

const del = async cond => {
  await todos()
    .where(cond)
    .del();
};

module.exports = { findOne, findAll, findByUserId, save, update, del };
