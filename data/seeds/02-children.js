exports.seed = async knex => {
   await knex("children").insert([
      {parent_id: 1, name: "Billy", age: 3},
      {parent_id: 1, name: "Joe", age: 5},
      {parent_id: 1, name: "Sally", age: 10},
      {parent_id: 2, name: "Joe", age: 7},
      {parent_id: 2, name: "Lucy", age: 7},
      {parent_id: 3, name: "Sarah", age: 4}
   ]);
};
