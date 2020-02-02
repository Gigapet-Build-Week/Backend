const router = require("express").Router();
const {status, GIVE_NAME_PWD} = require("../constants");
const authModel = require("./auth-model");
const isAuthorized = require("./authenticate");

//POST /api/auth/register
router.post("/register", async (req, res, next) => {
   const {username, password} = req.body;
   console.log(`registering: ${username}...`);

   if (!username || !password) {
      return res.status(400).json({
         message: GIVE_NAME_PWD
      });
   }

   try {
      const {password, ...sanitizedUser} = await authModel.add(req.body);
      res.status(status.CREATED).json(sanitizedUser);
   } catch (error) {
      console.error(`There was a problem registering a new user`);
      next(error);
   }

   // res.status(status.BAD_REQ).json({
   //    message: "Endpoint still under construction!"
   // });
});

module.exports =  router;