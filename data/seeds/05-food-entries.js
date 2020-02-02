// "Fruit"
// "Vegetable"
// "Grain"
// "Protien"
// "Dairy"
// "Oil"
exports.seed = async knex => {
   await knex("food_entries").insert([
      {child_id: 1, category_id: 1, eaten_on: "2020-02-01", servings: 1, description: "Apple"},
      {child_id: 1, category_id: 2, eaten_on: "2020-02-01", servings: 1, description: "Peas"},
      {child_id: 1, category_id: 2, eaten_on: "2020-02-01", servings: 1, description: "Carrots"},
      {child_id: 1, category_id: 3, eaten_on: "2020-02-01", servings: 1, description: "Rice Pilaf"},
      {child_id: 1, category_id: 4, eaten_on: "2020-02-01", servings: 1.25, description: "Meatloaf"},
      {child_id: 1, category_id: 6, eaten_on: "2020-02-01", servings: 1, description: "Meatloaf"},
      {child_id: 1, category_id: 5, eaten_on: "2020-02-01", servings: 1, description: "Cup of Milk"},
      {child_id: 2, category_id: 1, eaten_on: "2020-01-15", servings: 1, description: "Bowl of Cereal"},
      {child_id: 2, category_id: 3, eaten_on: "2020-01-15", servings: 1, description: "Bowl of Cereal"},
      {child_id: 2, category_id: 5, eaten_on: "2020-01-15", servings: 0.5, description: "Bowl of Cereal"},
      {child_id: 3, category_id: 2, eaten_on: "2020-01-30", servings: 1, description: "Spaghetti"},
      {child_id: 3, category_id: 3, eaten_on: "2020-01-30", servings: 2, description: "Spaghetti"},
      {child_id: 3, category_id: 6, eaten_on: "2020-01-30", servings: 0.5, description: "Spaghetti"},
      {child_id: 4, category_id: 4, eaten_on: "2020-01-16", servings: 2, description: "Eggs"},
      {child_id: 4, category_id: 4, eaten_on: "2020-01-16", servings: 1, description: "Bacon"},
      {child_id: 4, category_id: 1, eaten_on: "2020-01-16", servings: 0.5, description: "Orange Juice"},
   ]);
};