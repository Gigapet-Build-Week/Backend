/*
## Food Entry
- [ ] `POST /api/users/children/:id/food-log`
- [ ] `GET /api/users/children/:id/food-log`
- [ ] `GET /api/users/children/:id/food-log/:food_id`
- [ ] `PUT /api/users/children/:id/food-log/:food_id`
- [ ] `DELETE /api/users/children/:id/food-log/:food_id`
*/
const router = require("express").Router({mergeParams: true});
const {tables: {Children, Food_entries, Categories}, msg, status} = require("../constants");

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
const CategoryMustExist = async (req, res, next) => {
   const name = req.newFoodEntry.category;
   
   try {
      console.log(`Category Name: ${name}`)
      const [category] = await Categories.findBy({name});
      if (!category) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_CAT_EXISTS
         });
      }
   
      req.category = category;
      next();
   } catch (error) {
      next(error);
   }
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
const validateInput = (req, res, next) => {
   const {eaten_on, description, servings} = req.body;

   //eaton_on must be a Date
   const date = new Date(eaten_on);
   console.log(date);
   if (Number.isNaN(date.valueOf())) {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_FOOD_DATA
      });
   }

   //transform description to prevent XXS attacks
   // ??
   console.log(`description: ${description}`);
   if (!description) {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_FOOD_DATA
      });
   }

   //servings must be a number
   if (servings && typeof servings !== "number") {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_FOOD_DATA
      });
   }

   next();
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
// /api/users/children/:id/food-log
router.post("/", validateId("children"), ChildMustExist, validateInput, mustBeAllowed, (req, res, next) => {
   res.status(status.BAD_REQ).json({
      message: "endpoint still under construction!!"
   });
});
// router.get("/", validateInput, (req, res, next) => {
//    res.status(status.BAD_REQ).json({
//       message: "endpoint still under construction!!"
//    });
// });
// router.get();
// router.put();
// router.delete();

module.exports = router;