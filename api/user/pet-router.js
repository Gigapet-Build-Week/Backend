const router = require("express").Router({mergeParams: true});
const insertRecord = require("../utils/insertRecord");
const {status, msg, tables: {Pets, Children}} = require("../constants");

const validateInput = (req, res, next) => {
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

   req.newPet.health = health;
   req.newPet.health_target = health_target;
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
router.post("/", validateInput, noDuplicatePets, async (req, res, next) => {
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
   try {
      const [pet] = await Pets.findBy({child_id: req.child.id});
      if (!pet) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_PET_EXISTS
         });
      }

      res.json(pet);
   } catch (error) {
      next(error);
   }
});

//PUT /api/users/children/:id/pet
router.put("/", validateInput, async (req, res, next) => {
   try {
      //The pet must exist
      const [pet] = await Pets.findBy({child_id: req.newPet.child_id});
      if (!pet) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_PET_EXISTS
         });
      }

      await Pets.update(pet.id, req.newPet);
      const update = await Pets.findById(pet.id);
      res.status(status.ACCEPTED).json(update);
   } catch (error) {
      next(error);
   }
});

module.exports = router;