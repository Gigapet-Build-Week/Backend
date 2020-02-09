const request = require("supertest");
const server = require("../../api/server");
const {status, msg, APP_JSON} = require("../../api/constants");

const TEST_USER = {
   username: "OzzyOsbourn",
   password: "Im@R0ck$tar!"
   //children ids: 4 and 5
};
const login_user = require("../utils/loginUser");

module.exports = (method, base_url, token) => {
   test(`Shoud return ${status.BAD_REQ} when requested child-id is not an integer`, async () => {
      const token = await login_user(TEST_USER);
      const url = base_url.replace(/:id/i, "not-an-int");
      
      const response = (token)
         ? await request(server)[method](url).set("authorization", token)
         : await request(server)[method](url)

      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(msg.BAD_CHILD_DATA);
   });
   test(`Shoud return ${status.BAD_REQ} when requested child-id is less than 0`, async () => {
      const token = await login_user(TEST_USER);
      const url = base_url.replace(/:id/i, "-3");

      const response = (token)
         ? await request(server)[method](url).set("authorization", token)
         : await request(server)[method](url)

      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(msg.BAD_CHILD_DATA);
   });
   test(`Shoud return ${status.FORBIDDEN} when user does not "own" child's info`, async () => {
      const token = await login_user(TEST_USER);
      const url = base_url.replace(/:id/i, "3");

      const response = (token)
         ? await request(server)[method](url).set("authorization", token)
         : await request(server)[method](url)

      expect(response.status).toBe(status.FORBIDDEN);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(msg.FORBIDDEN);
   });
};