const router = require("express").Router();
const petRouter = require("./pet-router");
const foodRouter = require("./food-router");
const insertRecord = require("../utils/insertRecord");
const {status, msg, tables: {Children, Pets}} = require("../constants");

const validateChildId = (req, res, next) => {
   console.log(`Params: ${JSON.stringify(req.params, null, 3)}`);
   const id = Number(req.params.id);

   //Child ID must be an integer greater than 0
   if (!Number.isInteger(id)) {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_PET_DATA
      });
   }
   if (!id || id < 1) {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_PET_DATA
      });
   }

   next();
};
const ChildMustExist = async (req, res, next) => {
   console.log(`Params: ${JSON.stringify(req.params, null, 3)}`);
   const id = Number(req.params.id);

   try {
      //Child must exist
      const [child] = await Children.findById(id);
      if (!child) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_CHILD_EXISTS
         });
      }
   
      req.child = child;
      next();
   } catch (error) {
      next(error);
   }
};
const mustBeAllowed = (req, res, next) => {
   console.log(`Child: ${JSON.stringify(req.child, null, 3)}`);
   //parent must 'own' the child
   console.log(`${req.tokenPayload.id} !== ${req.child.parent_id}`);
   if (req.tokenPayload.id !== req.child.parent_id) {
      return res.status(status.FORBIDDEN).json({
         message: msg.FORBIDDEN
      });
   }

   next();
};

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

//`GET /api/users/children/:child_id`
router.get("/:id", validateChildId, ChildMustExist, mustBeAllowed, async (req, res, next) => {
   //If we get here, the child data is in req.child
   //get pet info
   try {
      const [pet] = await Pets.findBy({child_id: req.child.id});
      res.json({
         ...req.child,
         pet
      });
   } catch (error) {
      next(error);
   }
});

//PUT /api/users/children/:child_id`
router.put("/:id", validateChildId, ChildMustExist, mustBeAllowed, async (req, res, next) => {
   //data is valid
   const {parent_id, name, age} = req.body;
   const newData = {parent_id, name, age};

   try {
      await Children.update(req.child.id, newData);
      const [upd_child] = await Children.findById(req.child.id);
      const [pet] = await Pets.findBy({child_id: req.child.id});

      upd_child.pet = pet;
      res.status(status.ACCEPTED).json(upd_child);
   } catch (error) {
      next(error);
   }
});

// - [ ] `DELETE /api/users/children/:child_id`
router.delete("/:id", validateChildId, ChildMustExist, mustBeAllowed, async (req, res, next) => {
   //data is valid
   try {
      await Children.remove(req.child.id);
      res.status(status.ACCEPTED).json({
         message: "Child deleted!"
      });
   } catch (error) {
      next(error);
   }
});

///api/users/children/:id/pet
router.use("/:id/pet", validateChildId, ChildMustExist, mustBeAllowed, petRouter);
///api/users/children/:id/food-log
router.use("/:id/food-log", validateChildId, ChildMustExist, mustBeAllowed, foodRouter);

module.exports = router;