const {status} = require("../../api/constants");

module.exports = () => {
   test(`Shoud return ${status.BAD_REQ} when requested child-id is not an integer`, () => {
      expect(true).toBe(false);
   });
   test(`Shoud return ${status.BAD_REQ} when requested child-id is less than 0`, () => {
      expect(true).toBe(false);
   });
   test(`Shoud return ${status.FORBIDDEN} when user does not "own" child's info`, () => {
      expect(true).toBe(false);
   });
};