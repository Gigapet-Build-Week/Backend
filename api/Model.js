const knex_db = require("../data/knexDb");

class Model {
   constructor (tableName) {
      this.db = knex_db.bind(knex_db, tableName);
   }

   add (newItem) {
      return this.db()
         .insert(newItem)
         .returning("*");
   }
   find() {
      return this.db();
   }
   findBy (filter) {
      return this.db()
         .where(filter);
   }
   findById (id) {
      return this.findBy({id})
         .first();
   }
   update (id, newData) {
      return this.db()
         .update(newData)
         .where({id});
   }
   remove (id) {
      return this.db()
         .del()
   }
}

module.exports = Model;