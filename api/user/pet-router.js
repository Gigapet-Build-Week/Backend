const router = require("express").Router({mergeParams: true});
const inputValidation = require("../middleware/inputValidation");
const insertRecord = require("../utils/insertRecord");
const {status, msg, tableNames, tables: {Pets}} = require("../constants");

//`POST /api/users/children/:id/pet
router.post("/", inputValidation(tableNames.PETS), async (req, res, next) => {
   //req.params.id = child_id
   //health is auto-calculated... or will be
   // {
   //    child_id: 1,
   //    health: 508,
   //    health_target: 500
   // }

   // const id = Number(req.params.id);
   // if (!id || id < 1) {
   //    return res.status(status.BAD_REQ).json({
   //       message: msg.BAD_PET_DATA
   //    });
   // }

   // const {health, health_target} = req.body;
   // if (typeof health === "undefined" || health === null) {
   //    return res.status(status.BAD_REQ).json({
   //       message: msg.BAD_PET_DATA
   //    });
   // }
   // if (!Number.isInteger(health) || !Number.isInteger(health_target) ||
   //    (health < 0 || health_target <= 0))
   // {
   //    return res.status(status.BAD_REQ).json({
   //       message: msg.BAD_PET_DATA
   //    });
   // }

   try {
      //Must not already exist
      const [dupePet] = await Pets.findBy({child_id: req.child_id});
      if (dupePet) {
         return res.status(status.BAD_REQ).json({
            message: msg.PET_EXISTS
         });
      }

      //create a pet avatar
      const newPet = {child_id: id, health, health_target};
      const [pet] = await insertRecord(new Model("pets"), newPet);

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

});

//PUT /api/users/children/:id/pet

//// DELETE /api/users/children/:id/pet
module.exports = router;