const USER = "users";
const CHILD = "children";
const PET = "pets";
const CATEGORY = "categories";
const FOOD_ENTRY = "food_entries";

exports.up = async function (knex) {
   await knex.schema.createTable(USER, table => {
      //id  integer [pk, increment] //auto increment
      table.increments("id");
      //username varchar(128) [not null, unique]
      table.string("username", 128)
         .unique()
         .notNullable();
      //password varchar(128) [not null]
      table.string("password", 128) 
         .notNullable();
      //is_onboarded boolean [default: 0]
      table.boolean("is_onboarded")
         .defaultTo(0);
      //knickname varchar(128) [null]
      table.string("knickname", 128)
      //created datetime [not null]
      table.dateTime("created_at", {precision: 6})
         .notNullable();
      //last_login datetime [not null]
      table.dateTime("last_login")
         .notNullable();
   });

   await knex.schema.createTable(CHILD, table => {
      //id  integer [pk, increment] //auto increment
      table.increments("id"); 
      //parent_id integer [not null, ref: > user.id]
      table.integer("parent_id") 
         .notNullable()
         .references("id").inTable(USER)
         .onUpdate("CASCADE")
         .onDelete("CASCADE");
      //name varchar(128) [not null]
      table.string("name", 128)  
         .notNullable();
      //age unsigned [default: 0]
      table.integer("age")       
         .unsigned()
         .defaultTo(0);

   });

   await knex.schema.createTable(PET, table => {
      //id  integer [pk, increment] //auto increment
      table.increments("id");
      //id  integer [pk, increment] //auto increment
      table.integer("child_id")
         .unique()
         .notNullable()
         .references("id").inTable(CHILD)
         .onUpdate("CASCADE")
         .onDelete("CASCADE");
      //health_total unsigned [default: 0] //values are between 0 and 1000 (target: 500)
      table.integer("health_total")
         .unsigned()
         .notNullable()
         .defaultTo(0);
      //health_target unsigned [default: 500]
      table.integer("health_target")
         .unsigned()
         .notNullable()
         .defaultTo(500);
   });

   await knex.schema.createTable(CATEGORY, table => {
      //id  integer [pk, increment] //auto increment
      table.increments("id");
      //name string [not null, unique]
      table.string("name", 128)
         .unique()
         .notNullable()
      //suggested_servings unsigned [default: 1]
      table.integer("suggested_servings")
         .defaultTo(1);
      //description string [default: null]
      table.integer("description")
   });

   await knex.schema.createTable(FOOD_ENTRY, table => {
      //id  integer [pk, increment] //auto increment
      table.increments("id");
      //child_id integer [ref: > child.id]
      table.integer("child_id")
         .notNullable()
         .references("id").inTable(CHILD)
         .onUpdate("CASCADE")
         .onDelete("CASCADE");
      //category_id integer [ref: > category.id]
      table.integer("category_id")
         .references("id").inTable(CATEGORY)
         .onUpdate("CASCADE")
         .onDelete("CASCADE");
      //eaten_on date [not null]
      table.date("eaten_on")
         .notNullable();
      //description string
      table.string("description")
         .notNullable();
      //servings unsigned [default: 1]
      table.integer("servings")
         .unsigned()
         .defaultTo(1);
   });
};

exports.down = async function (knex) {
   await knex.schema.dropTableIfExists(FOOD_ENTRY);
   await knex.schema.dropTableIfExists(CATEGORY);
   await knex.schema.dropTableIfExists(PET);
   await knex.schema.dropTableIfExists(CHILD);
   await knex.schema.dropTableIfExists(USER);
};
