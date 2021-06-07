require("dotenv").config();

let env = process.env;

function intValue(value, defaultValue) {
  return parseInt(value) || defaultValue;
}

let server = {
  secure: env.SERVER_SECURE == "true" || false,
  port: intValue(env.PORT, 1234),
  host: env.SERVER_HOST || "localhost",
  secretKey: env.SECRET_KEY || "",
  adminEmail: env.ADMIN_EMAIL || "",
  guestEmail: env.GUEST_EMAIL || ""
};

let protocol = server.secure ? "https" : "http";
let port = server.port == 80 || server.port == 443 ? "" : `:${server.port}`;
let serverURL = `${protocol}://${server.host}${port}`;
server.url = env.SERVER_URL || serverURL;

module.exports = {
  server,
  auth: {
    firebase: {
      databaseURL: env.FIREBASE_DATABASE_URL || ""
    },
    facebook: {
      clientID: env.FACEBOOK_APP_ID || "",
      clientSecret: env.FACEBOOK_APP_SECRET || "",
      callbackURL: server.url + "/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture", "link"],
      passportOptions: { scope: ["email"] },
      accessToken: env.FACEBOOK_ACCESS_TOKEN || "",
      appMode: env.FACEBOOK_APP_MODE || "",
      businessId: env.FACEBOOK_BUSINESS_ID || ""
    }
  },
  db: {
    client: "pg",
    connection: env.DB_CONN || "",
    migrations: {
      tableName: "migrations"
    },
    pool: { min: 5, max: 64 }
  }
};
