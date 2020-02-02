const router = require("express").Router();
const {status, GIVE_NAME_PWD, ALREADY_EXISTS} = require("../constants");
const authModel = require("./auth-model");
const isAuthorized = require("./authenticate");

//POST /api/auth/register
router.post("/register", async (req, res, next) => {
   const {username, password} = req.body;
   console.log(`registering: ${username}...`);

   //Must have a username and password
   if (!username || !password) {
      return res.status(status.BAD_REQ).json({
         message: GIVE_NAME_PWD
      });
   }

   //Must not already exist
   const dupeUser = await authModel.findBy({username}).first();
   if (dupeUser) {
      return res.status(status.BAD_REQ).json({
         message: ALREADY_EXISTS
      });
   }

   try {
      const {password, ...sanitizedUser} = await authModel.add(req.body);
      sanitizedUser.is_onboarded = !!sanitizedUser.is_onboarded;

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