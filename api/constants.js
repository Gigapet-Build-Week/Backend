const Model = require("./Model");

const APP_JSON = "application/json";
const tableNames = {
   USERS: "users",
   CHILDREN: "children",
   PETS: "pets",
   CATEGORIES: "categories",
   FOOD_ENTRIES: "food_entries",
};
const tables = {
   Users: new Model(tableNames.USERS),
   Children: new Model (tableNames.CHILDREN),
   Pets: new Model (tableNames.PETS),
   Categories: new Model (tableNames.CATEGORIES),
   Food_entries: new Model (tableNames.FOOD_ENTRIES),
};
const msg = {
   FORBIDDEN: "You are not allowed to access this information.",
   PLS_LOGIN: "You must be logged in.",
   GIVE_NAME_PWD: "Please provide a username and password.",
   BAD_NAME_PWD: "Bad username or passowrd",
   ALREADY_EXISTS: "That user already exists!",
   CHILD_EXISTS: "That child already exists!",
   NO_CHILD_EXISTS: "That child doesn't exist!",
   BAD_CHILD_DATA: "Malformed child input",
   PET_EXISTS: "That pet already exists!",
   NO_PET_EXISTS: "Your child doesn't have a pet!",
   BAD_PET_DATA: "Malformed pet input",
};

const status = {
   OK: 200,
   CREATED: 201,
   ACCEPTED: 202,
   NO_CONTENT: 204,
   BAD_REQ: 400,
   UNAUTHENTICATED: 401,
   FORBIDDEN: 403,
   NOT_FOUND: 404,
   SERVER_ERR: 500
};

module.exports = {
   APP_JSON,
   tableNames,
   tables,
   msg,
   status,
};