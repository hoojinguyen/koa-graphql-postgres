const _ = require("lodash");
const bcrypt = require("bcryptjs");
const util = require("util");
const jwt = require("jwt-simple");

const config = require("./config");

const bcryptHash = util.promisify(bcrypt.hash);

const hashPassword = password => {
  return bcryptHash(password, 10);
};

const verifyPassword = util.promisify(bcrypt.compare);

const generateToken = user => jwt.encode(user, config.server.secretKey);

const getProfileName = profile => {
  if (!profile) {
    return "";
  }
  if (profile.name) {
    return profile.name;
  }
  return _.filter([profile.first_name, profile.last_name]).join(" ");
};

const arrayToDict = (a, value = true) => {
  let d = {};
  for (let item of a) {
    d[item] = value;
  }
  return d;
};

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
  getProfileName,
  hashPassword,
  verifyPassword,
  generateToken,
  arrayToDict,
  sleep
};
