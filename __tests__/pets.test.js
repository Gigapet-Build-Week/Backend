// // - [ ] `POST /api/users/children/:id/pet`
// // - [ ] `GET /api/users/children/:id/pet`
// // - [ ] `PUT /api/users/children/:id/pet`
// // - [ ] `DELETE /api/users/children/:id/pet`
// const superTest = require("supertest");
// const server = require("../api/server");
// const db = require("../data/knexDb");
// const {status, msg, APP_JSON} = require("../api/constants");

// const BASE_URL = "/api/users/account";

// const TEST_USER = {
//    username: "OzzyOsbourn",
//    password: "Im@R0ck$tar!"
// };
// const get_pets = (token, child_id) => {
//    const URL = `${BASE_URL}/${child_id}/pets`;
//    if (!token) {
//       return superTest(server)
//          .get(URL);
//    }

//    return superTest(server)
//       .get(URL)
//       .set("authorization", token);
// };
// const put_pets = (child_id, id, data) => {
//    return superTest(server)
//       .put(URL)
//       .send(data);
// };
// const remove_pets = (id) => {
//    return superTest(server)
//       .get(URL);
// };

// describe("Test Pets Endpoints", () => {
//    describe("POST /api/users/children/:id/pet", () => {
//       test("placeholder", () => {
//          expect(true).toBe(false);
//       });
//    });
//    describe("GET /api/users/children/:id/pet", () => {
//       test("placeholder", () => {
//          expect(true).toBe(false);
//       });
//    });
//    describe("PUT /api/users/children/:id/pet", () => {
//       test("placeholder", () => {
//          expect(true).toBe(false);
//       });
//    });
//    describe("DELETE /api/users/children/:id/pet", () => {
//       test("placeholder", () => {
//          expect(true).toBe(false);
//       });
//    });
// });