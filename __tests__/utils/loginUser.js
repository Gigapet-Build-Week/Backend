const request = require("supertest");
const server = require("../../api/server");
const {status} = require("../../api/constants");

module.exports = async (user) => {
   // console.log(`Logging in ${user.username}`);
   const login_res = await request(server)
      .post("/api/auth/login")
      .send(user);

   expect(login_res.status).toBe(status.OK);
   expect(login_res.body.token).not.toBeUndefined();
      
   return login_res.body.token;
};