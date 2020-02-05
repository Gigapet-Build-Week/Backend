const Model = require("./Model");

const APP_JSON = "application/json";
const tables = {
   Users: new Model("users"),
   Children: new Model ("children"),
   Pets: new Model ("pets"),
   Categories: new Model ("categories"),
   Food_entries: new Model ("food_entries"),
};
const msg = {
   PLS_LOGIN: "You must be logged in.",
   GIVE_NAME_PWD: "Please provide a username and password.",
   BAD_NAME_PWD: "Bad username or passowrd",
   ALREADY_EXISTS: "That user already exists!",
   CHILD_EXISTS: "That child already exists!",
   BAD_CHILD_DATA: "Malformed child input",
   PET_EXISTS: "That pet already exists!",
   BAD_PET_DATA: "Malformed pet input",
};

const status = {
   OK: 200,
   CREATED: 201,
   BAD_REQ: 400,
   UNAUTHENTICATED: 401,
   FORBIDDEN: 403,
   NOT_FOUND: 404,
   SERVER_ERR: 500
};

module.exports = {
   APP_JSON,
   tables,
   msg,
   status,
};