const USER = "USER";
const CHILD = "CHILD";
const PET = "PET";
const FOOD_ENTRY = "FOOD_ENTRY";
const CATEGORY = "CATEGORY";

exports.up = async function (knex) {
   knex.schema.create_table(USER, table => {
      table.increment("id");     //id  integer [pk, increment] //auto increment
      table.string("username", 128) //username varchar(128) [not null, unique]
         .unique()
         .notNullable();
      table.string("password", 128) //password varchar(128) [not null]
         .notNullable();
      table.boolean("is_onboarded") //is_onboarded boolean [default: 0]
         .defaultTo(0); 
      table.string("knickname", 128) //knickname varchar(128) [null]
      table.dateTime("created")  //created datetime [not null]
         .notNullable();
      table.dateTime("last_login")  //last_login datetime [not null]
         .notNullable();
   });

   knex.schema.create_table(CHILD, table => {
      table.increment("id");     //id  integer [pk, increment] //auto increment
      table.integer("parent_id") //parent_id integer [not null, ref: > user.id]
         .notNullable()
         .references("id").inTable(USER);
      table.string("name", 128) //name varchar(128) [not null]
         .notNullable();
      table.integer("age") //age unsigned [default: 0]
         .unsigned()
         .defaultTo(0);

   });

   knex.schema.create_table(PET, table => {
      table.increment("id");    //id  integer [pk, increment] //auto increment
      table.integer("child_id") //[unique, not null, ref: - child.id]
         .unique()
         .notNullable()
         .references("id").inTable(CHILD);
      table.integer("health_total") //health_total unsigned [default: 0] //values are between 0 and 1000 (target: 500)
         .unsigned()
         .notNullable()
         .defaultTo(0);
      table.integer("health_total") //health_total_target unsigned [default: 500]
         .unsigned()
         .notNullable()
         .defaultTo(500);
   });


};

exports.down = async function (knex) {
   knex.schema.dropTableIfExists(CATEGORY);
   knex.schema.dropTableIfExists(FOOD_ENTRY);
   knex.schema.dropTableIfExists(PET);
   knex.schema.dropTableIfExists(CHILD);
   knex.schema.dropTableIfExists(USER);
};
