const router = require("express").Router;
const {status} = require("../constants");

router.get("/", (req, res, next) => {
   res.status(status.BAD_REQ).json({
      message: `${req.method}  ${req.url} still under construction!`
   });
});
router.get("/:id", (req, res, next) => {
   res.status(status.BAD_REQ).json({
      message: `${req.method}  ${req.url} still under construction!`
   });
});
router.put("/:id", (req, res, next) => {
   res.status(status.BAD_REQ).json({
      message: `${req.method}  ${req.url} still under construction!`
   });
});
router.remove("/:id", (req, res, next) => {
   res.status(status.BAD_REQ).json({
      message: `${req.method}  ${req.url} still under construction!`
   });
});

module.exports = router;