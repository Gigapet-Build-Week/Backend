function validateInput (tableName) {
   console.log(`Validate Input: ${tableName}`);
   const pets = (req, res, next) => {
      const id = Number(req.params.id);
      console.log("Child ID: " + id);
      if (!id || id < 1) {
         return res.status(status.BAD_REQ).json({
            message: msg.BAD_PET_DATA
         });
      }

      const {health, health_target} = req.body;
      if (typeof health === "undefined" || health === null) {
         return res.status(status.BAD_REQ).json({
            message: msg.BAD_PET_DATA
         });
      }
      if (!Number.isInteger(health) || !Number.isInteger(health_target) ||
         (health < 0 || health_target <= 0))
      {
         return res.status(status.BAD_REQ).json({
            message: msg.BAD_PET_DATA
         });
      }

      //input is good
      req.child_id = id;
      next();
   };
   
   // const validate = {users, children, pets, categories, food_entries};
   const validate = {pets};
   console.log(validate[tableName]);
   return validate[tableName];
}

module.exports = validateInput;