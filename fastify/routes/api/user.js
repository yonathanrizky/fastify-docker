const { user } = require("../../controllers");

const userRoutes = async (app, options) => {
  app.get(
    "/",
    {
      preHandler: [app.authenticate],
    },
    (request, reply) => {
      reply.send({
        status: "OK",
      });
    }
  );
  //   app.get("/:id", user.detail);
  app.post("/", user.create);
  //   app.put("/:id", user.update);
  //   app.delete("/:id", user.destroy);
};

module.exports = userRoutes;
