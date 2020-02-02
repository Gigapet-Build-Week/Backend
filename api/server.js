const express = require("express");
const helmet = require("helmet");
const authRouter = require("./auth/auth-router");
// const userRouter = require("./api/user");
const server = express();

//apply middleware
server.use(helmet());
server.use(express.json());

//routes
server.use("/api/auth", authRouter);

//404 Page not found
server.use((req, res) => {
   res.status(404).json({
      message: "Page Not Found!"
   });
});

//Global 500 Error
server.use((error, req, res, next) => {
   console.error(error.toString());
   res.status(500).json({
      data: error.toString()
   });
});

module.exports =  server;