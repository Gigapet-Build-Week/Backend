const superTest = require("supertest");
const server = require("../api/server");
const db = require("../data/knexDb");
const {status, GIVE_NAME_PWD} = require("../api/constants");

const TEST_USER = {
   username: "Your Mom",
   password: "Im@R0ck$tar!"
};
const APP_JSON = "application/json";

const register_user = (userData) => {
   return superTest(server)
      .post("/api/auth/register")
      .send(userData);
};
const login_user = ({username, password}) => {
   return superTest(server)
      .post("/api/auth/login")
      .send({username, password});
};


beforeAll(async () => {
   await db.seed.run();
})

describe("POST /api/auth/register", () => {
   test("Returns status code 400 when missing username", async () => {
      const response = await register_user({
         password: TEST_USER.password
      });
      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(GIVE_NAME_PWD);
   });

   test("Returns status code 400 when missing password", async () => {
      const response = await register_user({
         username: TEST_USER.username
      });
      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(GIVE_NAME_PWD);
   });

   test("Returns status code 201 when data is good", async () => {
      const response = await register_user(TEST_USER);
      const newUser = response.body;
      expect(response.status).toBe(status.CREATED);
      expect(response.type).toBe(APP_JSON);

      //test user properties
      expect(newUser.username).toBe(TEST_USER.username);
      expect(newUser.password).toBeUndefined();
      expect(newUser.is_onboarded).toBe(false);
      expect(newUser.knickname).toBeNull();
   });

   // test("Returns status code 400 when user already exists", () => {
   //    expect(false).toBe(true);
   // });
});