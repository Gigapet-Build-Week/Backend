exports.seed = async (knex) => {
   await knex("food_entries").truncate();
   await knex("categories").truncate();
   await knex("pets").truncate();
   await knex("children").truncate();
   await knex("users").truncate();
};