// exports.seed = async (knex) => {
//    await knex("food_entries").truncate();
//    await knex("categories").truncate();
//    await knex("pets").truncate();
//    await knex("children").truncate();
//    await knex("users").truncate();
// };

const cleaner = require('knex-cleaner');

exports.seed = function (knex) {
   return cleaner.clean(knex, {
      mode: 'truncate',
      ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
   });
};