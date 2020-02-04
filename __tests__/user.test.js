const superTest = require("supertest");
const server = require("../api/server");
const db = require("../data/knexDb");
const {status, msg, APP_JSON} = require("../api/constants");

const URL = "/api/users/account";

const TEST_USER = {
   username: "OzzyOsbourn",
   password: "Im@R0ck$tar!"
};
const get_users = (token) => {
   if (!token) {
      return superTest(server)
         .get(URL);
   }

   return superTest(server)
      .get(URL)
      .set("authorization", token);
};
const put_users = (id, data) => {
   return superTest(server)
      .put(URL)
      .send(data);
};
const remove_users = (id) => {
   return superTest(server)
      .get(URL);
};

//*** Begin Tests ***//
beforeAll(async () => {
   await db.seed.run();
});

describe("Test Users Endpoints", () => {
   describe("GET /api/users/account", () => {
      test("Should return status code 401 when no authorization header is present", async () => {
         const response = await get_users();
         expect(response.status).toBe(status.UNAUTHENTICATED);
         expect(response.type).toBe(APP_JSON);
         expect(response.body.message).toBe(msg.PLS_LOGIN);
      });
      test("Should return status code 401 when authorization token is invalid", async () => {
         const response = await get_users("This-is-a-bad-token");
         expect(response.status).toBe(status.UNAUTHENTICATED);
         expect(response.type).toBe(APP_JSON);
         expect(response.body.message).toBe(msg.PLS_LOGIN);
      });
      test("Returns status code 200 when auth token is valid", async () => {
         const login_res = await superTest(server)
            .post("/api/auth/login")
            .send(TEST_USER);
         expect(login_res.status).toBe(status.OK);
         const {token} = login_res.body;

         const response = await get_users(token);
         expect(response.status).toBe(status.OK);
         expect(response.type).toBe(APP_JSON);
         expect(response.body).toMatchObject({
            username: TEST_USER.username,
            is_onboarded: expect.any(Boolean),
            updated_at: expect.any(String),
            children: expect.any(Array)
         });

         if (response.body.knickname) {
            expect(typeof response.body.knickname === "string").toBe(true);
         }
      });
   });
   // describe("PUT /api/users/account", () => {
   //    test("placeholder", () => {
   //       expect(true).toBe(false);
   //    });
   // });
   // describe("DELETE /api/users/account", () => {
   //    test("placeholder", () => {
   //       expect(true).toBe(false);
   //    });
   // });
});