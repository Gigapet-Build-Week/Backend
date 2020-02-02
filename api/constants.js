const GIVE_NAME_PWD = "Please provide a username and password.";
const ALREADY_EXISTS = "That username already exists!";
const status = {
   OK: 200,
   CREATED: 201,
   BAD_REQ: 400,
   UNAUTHENTICATED: 401,
   FORBIDDEN: 403
};

module.exports = {
   GIVE_NAME_PWD,
   ALREADY_EXISTS,
   status
};