const router = require("express").Router();
const petRouter = require("./pet-router");
const foodRouter = require("./food-router");
const insertRecord = require("../utils/insertRecord");
const {status, msg, tables: {Children}} = require("../constants");

//`POST /api/users/children`
router.post("/", async (req, res, next) => {
   //req.tokenPayload has user id and knickname
   //New Child
   //{
   //    name: "",
   //    age: 99
   // }
   const {name, age} = req.body;
   const {id} = req.tokenPayload;

   //Must have a name and age
   if (!name || !age) {
      return res.status(status.BAD_REQ).json({
         message: "Missing name and/or age"
      });
   }

   //name must be a string
   if (typeof name !== "string") {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_CHILD_DATA
      });
   }
   //age must be an integer
   if (!Number.isInteger(age)) {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_CHILD_DATA
      });
   }

   try {
      //Must not already exist
      const dupeChild = await Children.findBy({parent_id: id, name, age}).first();
      if (dupeChild) {
         return res.status(status.BAD_REQ).json({
            message: msg.CHILD_EXISTS
         });
      }

      //add the new child
      const newChild = {parent_id: id, name, age};
      const [child] = await insertRecord(Children, newChild);

      if (!child) {
         throw new Error("Something terrible happend while adding a child!");
      }

      res.status(status.CREATED).json(child);
   } catch (error) {
      next(error);
   }
});

///api/users/children/:id/pet
router.use("/:id/pet", petRouter);

///api/users/children/:id/food-log
router.use("/:id/food-log", foodRouter);

module.exports = router;