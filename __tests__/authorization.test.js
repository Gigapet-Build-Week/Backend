const superTest = require("supertest");
const jwt = require("jsonwebtoken");
const server = require("../api/server");
const db = require("../data/knexDb");
const {status, msg} = require("../api/constants");

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


//*** Begin Tests ***//
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
      expect(response.body.message).toBe(msg.GIVE_NAME_PWD);
   });

   test("Returns status code 400 when missing password", async () => {
      const response = await registerUser({
         username: TEST_USER.username
      });
      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(msg.GIVE_NAME_PWD);
   });

   test("Returns status code 201 when data is good", async () => {
      const response = await registerUser(TEST_USER);
      const newUser = response.body;
      expect(response.status).toBe(status.CREATED);
      expect(response.type).toBe(APP_JSON);

      //test user properties
      expect(newUser).toMatchObject({
         username: TEST_USER.username,
         is_onboarded: false,
         knickname: null,
         created_at: expect.anything(),
         last_login: expect.anything()
      });
      expect(newUser.password).toBeUndefined();
   });

   test("Returns status code 400 when user already exists", async () => {
      const response = await registerUser(TEST_USER);
      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(msg.ALREADY_EXISTS);
   });
});

describe("POST /api/auth/login", () => {
   test("Returns status code 400 when missing username", async () => {
      const response = await loginUser({
         password: TEST_USER.password
      });
      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(msg.GIVE_NAME_PWD);
   });

   test("Returns status code 400 when missing password", async () => {
      const response = await loginUser({
         username: TEST_USER.username
      });
      expect(response.status).toBe(status.BAD_REQ);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(msg.GIVE_NAME_PWD);
   });

   test("Returns status code 401 when username doesn't exist", async () => {
      const response = await loginUser({
         ...TEST_USER,
         username: "NotReallyHere!"
      });
      expect(response.status).toBe(status.UNAUTHENTICATED);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(msg.BAD_NAME_PWD);
   })

   test("Returns status code 401 when password doens't match", async () => {
      const response = await loginUser({
         ...TEST_USER,
         password: "bad#password"
      });
      expect(response.status).toBe(status.UNAUTHENTICATED);
      expect(response.type).toBe(APP_JSON);
      expect(response.body.message).toBe(msg.BAD_NAME_PWD);
   })

   test("Returns status code 200 and a valid auth token when data is good", async () => {
      const response = await loginUser(TEST_USER);
      const {token} = response.body;
      expect(response.status).toBe(status.OK);
      expect(response.type).toBe(APP_JSON);

      //test user properties
      expect(response.body).toMatchObject({
         token: expect.anything(),
         message: `Welcome back ${TEST_USER.username}`
      });

      //verify token
      try {
         const isValidToken = jwt.verify(token, process.env.JWT_SECRET || "doh!");
         expect(isValidToken).toBeTruthy();
      } catch (error) {
         console.log("Login returned an invalid token");
         console.error(error.toString());
         expect(false).toBe(true);
      }
   });
});