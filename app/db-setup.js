const db = require("./db");
const config = require("./config");
const utils = require("./utils");

const initAdminUser = async () => {
  let email = config.server.adminEmail;
  let admin = await db.users.findOne({ email });
  if (!admin) {
    admin = {
      email,
      providers: {
        local: {}
      },
      name: "Admin",
      role: "admin"
    };
    admin.id = await db.users.save(admin);
  }
  return admin;
};

const initGuestUser = async () => {
  let email = config.server.guestEmail;
  let guest = await db.users.findOne({ email });
  if (!guest) {
    guest = {
      email,
      providers: {
        local: {}
      },
      name: "Guest",
      role: "guest"
    };
    guest.id = await db.users.save(guest);
  }
  return guest;
};

const dbSetup = async () => {
  let admin = await initAdminUser();
  let guest = await initGuestUser();
  return {
    admin,
    guest,
    adminToken: utils.generateToken(admin)
  };
};

module.exports = dbSetup;
