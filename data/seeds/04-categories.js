exports.seed = async knex => {
   await knex("categories").insert([
      {name: "Fruit", suggested_servings: 1.5, description: "Any fruit or 100% fruit juice counts as part of the Fruit Group. Fruits may be fresh, canned, frozen, or dried, and may be whole, cut-up, or pureed."},
      {name: "Vegetable", suggested_servings: 1, description: "Any vegetable or 100% vegetable juice counts as a member of the Vegetable Group. Vegetables may be raw or cooked; fresh, frozen, canned, or dried/dehydrated; and may be whole, cut-up, or mashed."},
      {name: "Grain", suggested_servings: 5, description: "Any food made from wheat, rice, oats, cornmeal, barley, or another cereal grain is a grain product. Bread, pasta, breakfast cereals, grits, and tortillas are examples of grain products. Foods such as popcorn, rice, and oatmeal are also included in the Grains Group."},
      {name: "Protein", suggested_servings: 5, description: "All foods made from meat, poultry, seafood, beans and peas, eggs, processed soy products, nuts, and seeds are considered part of the Protein Foods Group."},
      {name: "Dairy", suggested_servings: 3, description: "All fluid milk products and many foods made from milk that retain their calcium content, such as yogurt and cheese, are part of the Dairy Group. Calcium-fortified soymilk (soy beverage) is also included."},
      {name: "Oil", suggested_servings: 5, description: "Oils are fats that are liquid at room temperature, like the vegetable oils used in cooking."}
   ]);
};
