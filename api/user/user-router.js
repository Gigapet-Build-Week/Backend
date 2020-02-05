const router = require("express").Router();
const childRouter = require("./child-router");
const Model = require("../Model");
const Users = new Model("users");
const Children = new Model("children");
const {status} = require("../constants");

router.get("/account", async (req, res, next) => {
   console.log(Users);
   //token payload is expected in req.tokePayload
   //token payload { id: user.id, knickname: user.knickname }
   try {
      const {id} = req.tokenPayload;
      const [user] = await Users.findById(id);

      if (!user) {
         next(new Error("This user no longer exists!! This shouldn't happen."));
      }
   
      const {username, knickname, is_onboarded, updated_at} = user;
      const children = await Children.findBy({parent_id: user.id});
      const data = {
         username, 
         knickname, 
         is_onboarded: !!is_onboarded, 
         updated_at, 
         children
      };

      res.json(data);
      // res.status(status.BAD_REQ).json({
      //    message: `${req.method}  ${req.url} still under construction!`
      // });
   } catch (error) {
      next(error);
   }
});
router.put("/:id", (req, res, next) => {
   res.status(status.BAD_REQ).json({
      message: `${req.method}  ${req.url} still under construction!`
   });
});
router.delete("/:id", (req, res, next) => {
   res.status(status.BAD_REQ).json({
      message: `${req.method}  ${req.url} still under construction!`
   });
});

//subrouter
router.use("/children", childRouter);

module.exports = router;