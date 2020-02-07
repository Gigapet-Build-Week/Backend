// ## Food Entry
// - [x] `POST /api/users/children/:id/food-log`
// - [x] `GET /api/users/children/:id/food-log`
// - [x] `GET /api/users/children/:id/food-log/:food_id`
// - [x] `PUT /api/users/children/:id/food-log/:food_id`
// - [x] `DELETE /api/users/children/:id/food-log/:food_id`
const router = require("express").Router({mergeParams: true});
const insertRecord = require("../utils/insertRecord");
const {
   tableNames: {CHILDREN, FOOD_ENTRIES},
   tables: {Children, Food_entries, Categories}, 
   msg, status
} = require("../constants");

//local middleware
const validateFoodId = (req, res, next) => {
   const id = Number(req.params.food_id);

   //Child ID must be an integer greater than 0
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

   next();
};
const validateInput = (req, res, next) => {
   const {category, eaten_on, description, servings} = req.body;

   //must have a category
   if (!category) {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_FOOD_DATA
      });
   }

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

   req.newFoodEntry = {
      ...req.newFoodEntry,
      eaten_on,
      description,
      servings
   };
   next();
};
const CategoryMustExist = async (req, res, next) => {
   const name = req.body.category;
   
   try {
      console.log(`Category Name: ${name}`)
      const [category] = await Categories.findBy({name});
      if (!category) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_CAT_EXISTS
         });
      }
   
      req.newFoodEntry.category_id = category.id;
      next();
   } catch (error) {
      next(error);
   }
};
const FoodMustExist = async (req, res, next) => {
   const id = req.params.food_id;
   try {
      //record must exist
      console.log(`Food ID: ${id}`)
      const [food] = await Food_entries.findById(id);
      if (!food) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_FOOD_LOG
         });
      }
   
      req.food_entry = food;
      next();
   } catch (error) {
      next(error);
   }
};

//routes
// /api/users/children/:id/food-log
router.post("/", validateInput, CategoryMustExist, async (req, res, next) => {
   try {
      //create a food entry
      console.log(req.newFoodEntry);
      const [food] = await insertRecord(Food_entries, req.newFoodEntry);
      if (!food) {
         throw new Error("Something terrible happend while adding a pet!");
      }

      res.status(status.CREATED).json(food);
   } catch (error) {
      next(error);
   }
});
router.get("/", async (req, res, next) => {
   try {
      const food_log = await Food_entries.findBy({child_id: req.child.id});
      if (!food_log || food_log.length === 0) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_FOOD_LOG
         });
      }

      const response = {
         ...req.child,
         food_log
      };
      res.json(response);
   } catch (error) {
      next(error);
   }
});
router.get("/:food_id", validateFoodId, async (req, res, next) => {
   const {id} = req.newFoodEntry;
   try {
      const [entry] = await Food_entries.findById(id);
      if (!entry) {
         return res.status(status.NOT_FOUND).json({
            message: msg.NO_FOOD_LOG
         });
      }

      res.json(entry);
   } catch (error) {
      next(error);
   }
});
router.put("/:food_id", validateFoodId, CategoryMustExist, FoodMustExist, validateInput, async (req, res, next) => {
   try {
      await Food_entries.update(req.food_entry.id, req.newFoodEntry);
      const update = await Food_entries.findById(req.food_entry.id);
      res.status(status.ACCEPTED).json(update);
   } catch (error) {
      next(error);
   }
});
router.delete("/:food_id", validateFoodId, FoodMustExist, async (req, res, next) => {
   const {id} = req.food_entry;

   //Must belong to the child
   if (req.child.id !== req.food_entry.child_id) {
      return res.status(status.BAD_REQ).json({
         message: msg.BAD_FOOD_DATA
      });
   }

   try {
      await Food_entries.remove(id);
      res.status(status.ACCEPTED).json({
         message: "Food Entry deleted!"
      });
   } catch (error) {
      next(error);
   }
});

module.exports = router;