const exampleRoutes = async (app, options) => {
  app.get("/", (request, reply) => {
    reply.send({
      status: "OK",
      user: request.user,
    });
  });

  app.get("/:id", (request, reply) => {
    reply.send({
      status: "OK",
      id: request.params.id,
    });
  });
};

module.exports = exampleRoutes;
