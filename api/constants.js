const msg = {
   GIVE_NAME_PWD: "Please provide a username and password.",
   BAD_NAME_PWD: "Bad username or passowrd",
   ALREADY_EXISTS: "That username already exists!"
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
   msg,
   status
};