const knex = require("knex");
const dbConfig = require("../knexfile");
const env = process.env.DB_ENV || "throwError";

module.exports = knex(dbConfig[env]);