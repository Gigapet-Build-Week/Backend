const {status, msg} = require("../constants");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   const {Authorization} = req.headers;
   const NO_PASS = () => {
      return res.status(status.UNAUTHENTICATED).json({ 
         message: msg.PLS_LOGIN
      });
   }

   if (!Authorization) {
      return NO_PASS();
   }

   //Is user authenticated?
   jwt.verify(
      Authorization, 
      process.env.JWT_SECRET, 
      (error, payload) => {
         if (error) {
            return NO_PASS();
         }

         req.tokenPayload = payload;
         next();
      }
   );
};