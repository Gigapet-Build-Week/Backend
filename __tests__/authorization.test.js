const superTest = require("supertest");
const server = require("../api/server");
const gigapet_db = require("../data/knexDb");
const {status, GIVE_NAME_PWD} = require("../api/constants");

const TEST_USER = {
   username: "Your Mom",
   password: "Im@R0ck$tar!",
   password_2: "Im@R0ck$tar!"
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


// beforeAll(async () => {
//    await gigapet_db.seed.run();
// })

describe("Testing Authorization", () => {
   describe("POST /api/auth/register", () => {
      test("Returns status code 400 when missing username", async () => {
         const response = await register_user({
            password: TEST_USER.password,
            password_2: TEST_USER.password_2
         });
         expect(response.status).toBe(status.BAD_REQ);
         expect(response.type).toBe(APP_JSON);
         expect(response.body.message).toBe(GIVE_NAME_PWD);
      });
      // it("Returns status code 400 when missing password");
      // it("Returns status code 400 when password_2 doesn't match password");
      // it("Returns status code 400 when username is not a string");
      // it("Returns status code 400 when password is not a string");
      // it("Returns status code 201 when data is good");
   });

   // describe("POST /api/login", () => {

   // });
});