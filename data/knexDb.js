const knex = require("knex");
const dbConfig = require("../knexfile");
const env = process.env.DB_ENV || "development";

module.exports = knex(dbConfig[env]);