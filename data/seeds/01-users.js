exports.seed = async knex => {
   await knex("users").insert([
      {
         username: "ender-wiggin",
         // password: "I<3L@mbda",
         password: "$2a$14$gRxj27mx8IqxDHwQ.KmXBOQeyoMyFqTKIPIjg3z3xjeCXg8tbIrsG",
         is_onboarded: 0,
         knickname: "Ender Wiggin"
      },
      {
         username: "OzzyOsbourn",
         // password: "Im@R0ck$tar!",
         password: "$2a$14$uo2eWsu.IKhEPB2APr3oYegvB1RBQJRvL/0LO0h9VtoIemtgGLLpu",
         is_onboarded: 1,
         knickname: "Ozzy"
      },
      {
         username: "GaryBertier",
         // password: "$up3rM4n82",
         password: "$2a$14$6S29TNk5FKE0/bts0UopZ.6kD9cK5Vxju9dMjIsUeKT8X9chJZ3.K",
         is_onboarded: 1
      },
      {
         username: "AdamSavage",
         // password: "I<3L@mbda2",
         password: "$2a$14$VJToUJVgw0WN9l3DWRpjNeP3WECkJoJA6Uoicp5lTNQUUt38.cNk6",
         is_onboarded: 0,
         knickname: "Mythbuster Extraordinaire"
      }
   ]);
};
