const server = require("./api/server");
const port = process.env.PORT || 5000;

server.listen(port, () => {
   console.log(`DB_ENV: ${process.env.DB_ENV}`);
   console.log(`Server is listening on http://localhost:${port} ...`);
});