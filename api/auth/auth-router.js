const router = require("express").Router();
const {status, GIVE_NAME_PWD} = require("../constants");
const isAuthorized = require("./authenticate");

//POST /api/auth/register
router.post("/register", (req, res, next) => {
   const {username, password} = req.body;

   if (!username || !password) {
      return res.status(400).json({
         message: GIVE_NAME_PWD
      });
   }

   res.status(status.BAD_REQ).json({
      message: "Endpoint still under construction!"
   });
});

module.exports =  router;