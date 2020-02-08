// - [ ] `POST /api/users/children/:id/food-log`
// - [ ] `GET /api/users/children/:id/food-log`
// - [ ] `GET /api/users/children/:id/food-log/:food_id`
// - [ ] `PUT /api/users/children/:id/food-log/:food_id`
// - [ ] `DELETE /api/users/children/:id/food-log/:food_id`
const superTest = require("supertest");
const {status} = require("../api/constants");

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
   describe("POST /api/users/children/:id/food-log", () => {
      testChildId();
      testInput();

      test(`Should return ${status.CREATED} and the new food entry when good input is provided`, () => {
         expect(true).toBe(false);
      });
   });
   describe("GET /api/users/children/:id/food-log", () => {
      testChildId();

      test(`Should return ${status.NOT_FOUND} when no food log is found for given child`, () => {
         expect(true).toBe(false);
      });
      test(`Should return ${status.OK} and a food log for given child when good input is provided`, () => {
         expect(true).toBe(false);
      });
   });
   describe("GET /api/users/children/:id/food-log/:food_id", () => {
      test("placeholder", () => {
         expect(true).toBe(false);
      });
   });
   describe("PUT /api/users/children/:id/food-log/:food_id", () => {
      test("placeholder", () => {
         expect(true).toBe(false);
      });
   });
   describe("DELETE /api/users/children/:id/food-log/:food_id", () => {
      test("placeholder", () => {
         expect(true).toBe(false);
      });
   });
});