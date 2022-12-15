const { person } = require("../../controllers");

const personRoutes = async (app, options) => {
  app.get("/", person.index);
  app.get("/:id", person.detail);
  app.post("/", person.create);
  app.put("/:id", person.update);
  app.delete("/:id", person.destroy);
};

module.exports = personRoutes;
