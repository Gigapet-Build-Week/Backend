exports.seed = async knex => {
   await knex("users").insert([
      {
         username: "Parent 01", 
         password: "plain text for now", 
         is_onboarded: 0,
         knickname: "Mom",
         created_at: "2019-11-13 04:23:00",
         last_login: "2020-01-31 20:09:00"
      },
      {
         username: "Parent 02", 
         password: "plain text for now", 
         is_onboarded: 1,
         knickname: "Dad",
         created_at: "2020-01-01 07:89:10",
         last_login: "2020-01-12 08:09:00"
      },
      {
         username: "Parent 03", 
         password: "plain text for now", 
         is_onboarded: 0,
         knickname: "Billy Bob",
         created_at: "2019-11-13 04:23:00",
         last_login: "2019-12-31 23:59:59"
      }
   ]);
};
