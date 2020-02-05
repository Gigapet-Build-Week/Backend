const express = require("express");
const helmet = require("helmet");
const authenticate = require("./auth/authenticate");
const authRouter = require("./auth/auth-router");
const userRouter = require("./user/user-router");
const {status} = require("./constants");
const server = express();

server.use(helmet());
server.use(express.json());

//main 
server.get("/", (req, res, next) => {
   res.json({
      api: "running",
      db_env: process.env.DB_ENV
   });
});

//routes
server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, userRouter);

//404 Page not found
server.use((req, res) => {
   res.status(status.NOT_FOUND).json({
      message: "Page Not Found!"
   });
});

//Global 500 Error
server.use((error, req, res, next) => {
   console.error(error.toString());
   res.status(status.SERVER_ERR).json({
      data: error.toString()
   });
});

module.exports =  server;