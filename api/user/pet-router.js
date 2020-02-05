const router = require("express").Router({mergeParams: true});
const inputValidation = require("../middleware/inputValidation");
const insertRecord = require("../utils/insertRecord");
const {status, msg, tableNames, tables: {Pets, Children}} = require("../constants");

//`POST /api/users/children/:id/pet
router.post("/", async (req, res, next) => {
   //ID must be integer greater than 0
   const id = Number(req.params.id);
   if (!id || id < 1) {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_PET_DATA
      });
   }

   //health and heath_target are required
   const {health, health_target} = req.body;
   if (typeof health === "undefined" || health === null) {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_PET_DATA
      });
   }
   //health and heath_target must be integers greater-than or equal to 0
   if (!Number.isInteger(health) || !Number.isInteger(health_target) ||
      (health < 0 || health_target < 0))
   {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_PET_DATA
      });
   }

   try {
      //Must not already exist
      const [dupePet] = await Pets.findBy({child_id: id});
      if (dupePet) {
         return res.status(status.BAD_REQ).json({
            message: msg.PET_EXISTS
         });
      }

      //create a pet avatar
      const newPet = {child_id: id, health, health_target};
      const [pet] = await insertRecord(Pets, newPet);

      if (!pet) {
         throw new Error("Something terrible happend while adding a pet!");
      }

      res.status(status.CREATED).json(pet);
   } catch (error) {
      next(error);
   }
});

//GET /api/users/children/:id/pet
router.get("/", async (req, res, next) => {
   //ID mubst be an integer greater than 0
   const id = Number(req.params.id);
   if (!Number.isInteger(id) || id < 1) {
      return res.status(status.NOT_FOUND).json({
         message: msg.NO_CHILD_EXISTS
      });
   }
   
   try {
      //Child must exist
      const [child] = await Children.findById(id);
      if (!child) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_CHILD_EXISTS
         });
      }

      //parent must 'own' the child
      console.log(`${req.tokenPayload.id} !== ${child.parent_id}`);
      if (req.tokenPayload.id !== child.parent_id) {
         return res.status(status.FORBIDDEN).json({
            message: msg.FORBIDDEN
         });
      }

      const [pet] = await Pets.findBy({child_id: id});
      if (!pet) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_CHILD_EXISTS
         });
      }

      res.json(pet);
   } catch (error) {
      next(error);
   }
});

//PUT /api/users/children/:id/pet

//// DELETE /api/users/children/:id/pet
module.exports = router;