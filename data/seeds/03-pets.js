exports.seed = async knex => {
   await knex("pets").insert([
      {child_id: 1, health: 508, health_target: 500},
      {child_id: 2, health: 249, health_target: 500},
      {child_id: 3, health: 599, health_target: 500},
      {child_id: 4, health: 75, health_target: 500},
      {child_id: 5, health: 150, health_target: 500},
      {child_id: 6, health: 345, health_target: 500},
      {child_id: 7, health: 133, health_target: 500},
   ]);
};
