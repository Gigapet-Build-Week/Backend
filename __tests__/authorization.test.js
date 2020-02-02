const superTest = require("supertest");
const server = require("../api/server");
const db = require("../data/knexDb");
const {status, GIVE_NAME_PWD, ALREADY_EXISTS} = require("../api/constants");

const TEST_USER = {
   username: "Your Mom",
   password: "Im@R0ck$tar!"
};
const APP_JSON = "application/json";

const runTest = (userData, toRoute) => {
   return superTest(server)
      .post(toRoute)
      .send(userData);
};
const registerUser = (userData) => {
   return runTest(userData, "/api/auth/register");
};
const loginUser = (userData) => {
   return runTest(userData, "/api/auth/login");
};



beforeAll(async () => {
   await db.seed.run();
})

describe("POST /api/auth/register", () => {
   test("Returns status code 400 when missing username", async () => {
      const response = await registerUser({
         password: TEST_USER.password
      });
      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(GIVE_NAME_PWD);
   });

   test("Returns status code 400 when missing password", async () => {
      const response = await registerUser({
         username: TEST_USER.username
      });
      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(GIVE_NAME_PWD);
   });

   test("Returns status code 201 when data is good", async () => {
      const response = await registerUser(TEST_USER);
      const newUser = response.body;
      expect(response.status).toBe(status.CREATED);
      expect(response.type).toBe(APP_JSON);

      //test user properties
      expect(newUser.username).toBe(TEST_USER.username);
      expect(newUser.password).toBeUndefined();
      expect(newUser.is_onboarded).toBe(false);
      expect(newUser.knickname).toBeNull();
      expect(newUser.created_at).toBeTruthy();
      expect(newUser.last_login).toBeTruthy();
   });

   test("Returns status code 400 when user already exists", async () => {
      const response = await registerUser(TEST_USER);
      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(ALREADY_EXISTS);
   });
});

describe("POST /api/auth/login", () => {
   test("Returns status code 400 when missing username", async () => {
      const response = await loginUser({
         password: TEST_USER.password
      });
      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(GIVE_NAME_PWD);
   });

   test("Returns status code 400 when missing password", async () => {
      expect(true).toBe(false);
   });

   test("Returns status code 200 and a valid auth token when data is good", async () => {
      expect(true).toBe(false);
   });
});