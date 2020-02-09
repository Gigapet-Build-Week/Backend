// - [ ] `POST /api/users/children/:id/food-log`
// - [ ] `GET /api/users/children/:id/food-log`
// - [ ] `GET /api/users/children/:id/food-log/:food_id`
// - [ ] `PUT /api/users/children/:id/food-log/:food_id`
// - [ ] `DELETE /api/users/children/:id/food-log/:food_id`
const request = require("supertest");
const server = require("../api/server");
const {status} = require("../api/constants");

const URL = "/api/users/children/:id/food-log";
const TEST_USER = {
   username: "OzzyOsbourn",
   password: "Im@R0ck$tar!"
   //children ids: 4 and 5
};

const login_user = require("./utils/loginUser");
const testChildId = require("./utils/testChildID");
const testFoodId = () => {
   test(`Shoud return ${status.BAD_REQ} when requested food-id is not an integer`, () => {
      expect(true).toBe(false);
   });
   test(`Shoud return ${status.BAD_REQ} when requested food-id is less than 0`, () => {
      expect(true).toBe(false);
   });
};
const testInput = () => {
   test(`Shoud return ${status.BAD_REQ} when no category is provided`, () => {
      expect(true).toBe(false);
   });
   test(`Shoud return ${status.BAD_REQ} when no description is provided`, () => {
      expect(true).toBe(false);
   });
   test(`Shoud return ${status.BAD_REQ} when servings is not a number`, () => {
      expect(true).toBe(false);
   });
   test(`Shoud return ${status.BAD_REQ} when servings is less than 1`, () => {
      expect(true).toBe(false);
   });
};

describe("Test Food Entries Endpoints", () => {
   describe(`POST ${URL}/:id/food-log`, () => {
      testChildId("post", URL);
      // testInput();
      test(`Should return ${status.CREATED} and the new food entry when good input is provided`, async () => {
         const token = await login_user(TEST_USER);
         console.log(`After Login Token: ${token}`);
         expect(true).toBe(false);
      });
   });
   describe(`GET ${URL}/:id/food-log`, () => {
      // testChildId();

      test(`Should return ${status.NOT_FOUND} when no food log is found for given child`, () => {
         expect(true).toBe(false);
      });
      test(`Should return ${status.OK} and a food log for given child when good input is provided`, () => {
         expect(true).toBe(false);
      });
   });
   describe(`GET ${URL}/:id/food-log/:food_id`, () => {
      // testChildId();
      // testFoodId();

      test(`Should return ${status.OK} and the requested food entry when good input is provided`, () => {
         expect(true).toBe(false);
      });
   });
   describe(`PUT ${URL}/:id/food-log/:food_id`, () => {
      // testChildId();
      // testFoodId();
      // testInput();

      test(`Should return ${status.OK} and the updated food entry when good input is provided`, () => {
         expect(true).toBe(false);
      });
   });
   describe(`DELETE ${URL}/:id/food-log/:food_id`, () => {
      // testChildId();
      // testFoodId();

      test(`Should return ${status.ACCEPTED} and a message when good input is provided`, () => {
         expect(true).toBe(false);
      });
   });
});