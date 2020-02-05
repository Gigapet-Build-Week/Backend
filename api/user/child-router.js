const router = require("express").Router();
const Model = require("../Model");
const insertRecord = require("../utils/insertRecord");
const {status, msg} = require("../constants");

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
      //add the new child
      const newChild = {parent_id: id, name, age};
      const [child] = await insertRecord(new Model("children"), newChild);

      if (!child) {
         throw new Error("Something terrible happend while adding a child!");
      }

      // //create a pet avatar
      // const newPet = {
      //    child_id: child.id,
      //    health: (process.env.DB_ENV !== "production")? 0 : undefined,
      //    health_target: (process.env.DB_ENV !== "production")? 0 : undefined,
      // };
      // const [pet] = await insertRecord(Pets, newPet);

      res.status(status.CREATED).json(child);
   } catch (error) {
      next(error);
   }
});


module.exports = router;