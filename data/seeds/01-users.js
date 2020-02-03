exports.seed = async knex => {
   await knex("users").insert([
      {
         username: "Parent 01", 
         password: "plain text for now", 
         is_onboarded: 0,
         knickname: "Mom"
      },
      {
         username: "Parent 02", 
         password: "plain text for now", 
         is_onboarded: 1,
         knickname: "Dad"
      },
      {
         username: "Parent 03", 
         password: "plain text for now", 
         is_onboarded: 0,
         knickname: "Billy Bob"
      }
   ]);
};
