const apiRoutes = async (app, options) => {
  // app.get("/person", require("../../controllers"));
  // const { usersController } = require("../../controllers");
  app.register(require("./person"), { prefix: "person" });
  //   app.register(require("./movies"), { prefix: "movies" });
  // app.get("/person", async (request, reply) => {
  //   return reply.send({
  //     name: "Jhon Doe",
  //     email: "jhon@doe.com",
  //   });
  // });
};

module.exports = apiRoutes;
