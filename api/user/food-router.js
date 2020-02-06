/*
## Food Entry
- [ ] `POST /api/users/children/:id/food-log`
- [ ] `GET /api/users/children/:id/food-log`
- [ ] `GET /api/users/children/:id/food-log/:food_id`
- [ ] `PUT /api/users/children/:id/food-log/:food_id`
- [ ] `DELETE /api/users/children/:id/food-log/:food_id`
*/
const router = require("express").Router({mergeParams: true});
const {tables: {Children, Food_entries}, msg} = require("../constants");

//local middleware
const validateId = (idType) => {
   return (req, res, next) => {
      const {id: child_id, food_id} = req.params;
      //ID must be an integer greater than 0
      const id = Number((idType === "children")? child_id : food_id);
      if (!Number.isInteger(id)) {
         return res.status(status.BAD_REQ).json({
            message: msg.BAD_FOOD_DATA
         });
      }
      if (!id || id < 1) {
         return res.status(status.BAD_REQ).json({
            message: msg.BAD_FOOD_DATA
         });
      }

      req.newFoodEntry = (idType === "children")? {child_id: id} : {id};
      next();
   };
};
const validateInput = (req, res, next) => {
   // //health and heath_target are required
   // const {health, health_target} = req.body;
   // if (typeof health === "undefined" || health === null) {
   //    return res.status(status.BAD_REQ).json({
   //       message: msg.BAD_PET_DATA
   //    });
   // }
   // //health and heath_target must be integers greater-than or equal to 0
   // if (!Number.isInteger(Number(health)) || !Number.isInteger(Number(health_target)) ||
   //    (health < 0 || health_target < 0))
   // {
   //    return res.status(status.BAD_REQ).json({
   //       message: msg.BAD_PET_DATA
   //    });
   // }

   // req.newPet.health = health;
   // req.newPet.health_target = health_target;
   next();
};
const ChildMustExist = async (req, res, next) => {
   try {
      //record must exist
      console.log(`Child ID: ${req.newFoodEntry.child_id}`)
      const [child] = await Children.findById(req.newFoodEntry.child_id);
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
const FoodMustExist = async (req, res, next) => {
   try {
      //record must exist
      console.log(`Food ID: ${req.newFoodEntry.id}`)
      const [food] = await Food_entries.findById(req.newFoodEntry.id);
      if (!food) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_FOOD_EXISTS
         });
      }
   
      req.food_entry = food;
      next();
   } catch (error) {
      next(error);
   }
};
const mustBeAllowed = (req, res, next) => {
   //parent must 'own' the child
   console.log(`${req.tokenPayload.id} !== ${req.child.parent_id}`);
   if (req.tokenPayload.id !== req.child.parent_id) {
      return res.status(status.FORBIDDEN).json({
         message: msg.FORBIDDEN
      });
   }

   next();
};

//routes
router.post();
router.get();
router.get();
router.put();
router.delete();

module.exports = router;