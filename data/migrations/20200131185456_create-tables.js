const USER = "USER";
const CHILD = "CHILD";
const PET = "PET";
const FOOD_ENTRY = "FOOD_ENTRY";
const CATEGORY = "CATEGORY";

exports.up = async function (knex) {
   knex.schema.create_table(USER, table => {
      //id  integer [pk, increment] //auto increment
      table.increment("id");
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
      table.dateTime("created")
         .notNullable();
      //last_login datetime [not null]
      table.dateTime("last_login")
         .notNullable();
   });

   knex.schema.create_table(CHILD, table => {
      //id  integer [pk, increment] //auto increment
      table.increment("id"); 
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

   knex.schema.create_table(PET, table => {
      //id  integer [pk, increment] //auto increment
      table.increment("id");
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
      //health_total_target unsigned [default: 500]
      table.integer("health_total")
         .unsigned()
         .notNullable()
         .defaultTo(500);
   });

   knex.schema.create_table(CATEGORY, table => {
      //id  integer [pk, increment] //auto increment
      table.increment("id");
      //name string [not null, unique]
      table.string("name", 128)
         .unique()
         .notNullable()
      //suggested_servings unsigned [default: 1]
      table.integer("suggested_servings")
         .defaultTo(1);
      //description string [default: null]
      table.integer("suggested_servings")
   });

   knex.schema.create_table(FOOD_ENTRY, table => {
      //id  integer [pk, increment] //auto increment
      table.increment("id");
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
      //suggested_servings unsigned [default: 1]
      table.integer("suggested_servings")
         .unsigned()
         .defaultTo(1);
      //description string
      table.string("description")
   });
};

exports.down = async function (knex) {
   knex.schema.dropTableIfExists(FOOD_ENTRY);
   knex.schema.dropTableIfExists(CATEGORY);
   knex.schema.dropTableIfExists(PET);
   knex.schema.dropTableIfExists(CHILD);
   knex.schema.dropTableIfExists(USER);
};
