const jwt = require("jsonwebtoken");
const {status, msg} = require("../constants");

module.exports = (req, res, next) => {
   console.log(`req.headers: ${JSON.stringify(req.headers, null, 3)}`);
   const {authorization} = req.headers;
   const NO_PASS = () => {
      return res.status(status.UNAUTHENTICATED).json({ 
         message: msg.PLS_LOGIN
      });
   }

   if (!authorization) {
      return NO_PASS();
   }

   //Is user authenticated?
   jwt.verify(
      authorization, 
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