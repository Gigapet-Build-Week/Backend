const server = require("../server");
const superTest = require("supertest");
const gigapet_db = require("../../data/knexDb.js");

describe("Testing Authorization", () => {
   describe("POST /api/register", () => {
      /*{username: string, password: string, password-2: string }*/
      it("Returns status code 400 when missing username");
      it("Returns status code 400 when missing password");
      it("Returns status code 400 when username is not a string");
      it("Returns status code 400 when password is not a string");
      it("Returns status code 400 when password-2 doesn't match password");
      it("Returns status code 201 when data is good");
   });

   // describe("POST /api/login", () => {

   // });
});