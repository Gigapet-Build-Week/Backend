const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/knexDb");
const {status, msg} = require("../api/constants");

// const get_users = (id) => {
//    return supertest(server)
//       .get(`/api/users/${id}`);
// };
// const put_users = (id, data) => {
//    return supertest(server)
//       .put(`/api/users/${id}`)
//       .send(data);
// };
// const remove_users = (id) => {
//    return supertest(server)
//       .get(`/api/users/${id}`);
// };

//*** Begin Tests ***//
beforeAll(async () => {
   await db.seed.run();
});

describe("Test Users Endpoints", () => {
   describe("Authenticate /api/users", () => {
      test("Should return status code 401 when no authorization header is present", () => {
         expect(true).toBe(false);
      });
   });
   describe("GET /api/users", () => {
      test("placeholder", () => {
         expect(true).toBe(false);
      });
   });
   describe("GET /api/users/:id", () => {
      test("placeholder", () => {
         expect(true).toBe(false);
      });
   });
   describe("PUT /api/users/:id", () => {
      test("placeholder", () => {
         expect(true).toBe(false);
      });
   });
   describe("DELETE /api/users/:id", () => {
      test("placeholder", () => {
         expect(true).toBe(false);
      });
   });
});