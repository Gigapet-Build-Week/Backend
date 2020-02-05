const router = require("express").Router({mergeParams: true});
const insertRecord = require("../utils/insertRecord");
const {status, msg, tableNames, tables: {Pets, Children}} = require("../constants");

const validateInput = (req, res, next) => {
   //Child ID must be an integer greater than 0
   const id = Number(req.params.id);
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

   //health and heath_target are required
   const {health, health_target} = req.body;
   if (typeof health === "undefined" || health === null) {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_PET_DATA
      });
   }
   //health and heath_target must be integers greater-than or equal to 0
   if (!Number.isInteger(Number(health)) || !Number.isInteger(Number(health_target)) ||
      (health < 0 || health_target < 0))
   {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_PET_DATA
      });
   }

   req.newPet = {child_id: id, health, health_target};
   next();
};
const ChildMustExist = async (req, res, next) => {
   try {
      //Child must exist
      const [child] = await Children.findById(req.newPet.child_id);
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

const MustBeAllowed = (req, res, next) => {
   //parent must 'own' the child
   console.log(`${req.tokenPayload.id} !== ${req.child.parent_id}`);
   if (req.tokenPayload.id !== req.child.parent_id) {
      return res.status(status.FORBIDDEN).json({
         message: msg.FORBIDDEN
      });
   }

   next();
};
const noDuplicatePets = async (req, res, next) => {
   try {
      //Must not already exist
      const [dupePet] = await Pets.findBy({child_id: req.child.id});
      if (dupePet) {
         return res.status(status.BAD_REQ).json({
            message: msg.PET_EXISTS
         });
      }
   
      next();
   } catch (error) {
      next(error);
   }
};



//`POST /api/users/children/:id/pet
router.post("/", validateInput, ChildMustExist, MustBeAllowed, noDuplicatePets, async (req, res, next) => {
   try {
      //create a pet avatar
      const [pet] = await insertRecord(Pets, req.newPet);
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
router.put("/", async (req, res, next) => {

});

//// DELETE /api/users/children/:id/pet
module.exports = router;