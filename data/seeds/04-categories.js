exports.seed = async knex => {
   await knex("categories").insert([
      {name: "Vegetable/Fruit", suggested_servings: 1.5, description: "greens, yellows, oranges, reds and purples that provide vitamins and minerals."},
      {name: "Protein", suggested_servings: 1, description: "meat, poultry, fish, eggs, beans, and nuts."},
      {name: "Grain", suggested_servings: 5, description: "Wholewheat cereals and breads, potatoes, pasta and rice."},
      {name: "Dairy", suggested_servings: 5, description: "milk, yogurt, and cheese."},
      {name: "Oils/Fats", suggested_servings: 3, description: "trans fats, spreads, and oils."},
      {name: "Sugars", suggested_servings: 5, description: "sweets and treats with high trans fat, sugar, and salt."}
   ]);
};
