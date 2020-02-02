const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {status, msg} = require("../constants");
const authModel = require("./auth-model");

//POST /api/auth/register
router.post("/register", async (req, res, next) => {
   const {username, password} = req.body;
   console.log(`registering: ${username}...`);

   //Must have a username and password
   if (!username || !password) {
      return res.status(status.BAD_REQ).json({
         message: msg.GIVE_NAME_PWD
      });
   }

   try {
      //Must not already exist
      const dupeUser = await authModel.findBy({username}).first();
      if (dupeUser) {
         return res.status(status.BAD_REQ).json({
            message: msg.ALREADY_EXISTS
         });
      }

      //register user
      const {password, ...sanitizedUser} = await authModel.addUser(req.body);
      sanitizedUser.is_onboarded = !!sanitizedUser.is_onboarded;

      //return sanitized user data
      res.status(status.CREATED).json(sanitizedUser);
   } catch (error) {
      console.error(`There was a problem registering a new user`);
      next(error);
   }
});

//POST /api/auth/login
router.post("/login", async (req, res, next) => {
   const {username, password} = req.body;

   //Must have username and password
   if (!username || !password) {
      return res.status(status.BAD_REQ).json({
         message: msg.GIVE_NAME_PWD
      });
   }

   try {
      //Validate username and password
      const user = await authModel.findBy({username}).first();
      if (!user || !bcrypt.compareSync(password, user.password)) {
         return res.status(status.UNAUTHENTICATED).json({
            message: msg.BAD_NAME_PWD
         });
      }

      //sign the token
      
   } catch (error) {
      console.error(`There was a problem logging in`);
      next(error);
   }


   console.error("Endpoint still under construction!");
   res.status(status.NOT_FOUND).json({
      message: "Endpoint still under construction!"
   });
});

module.exports =  router;