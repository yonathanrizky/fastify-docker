const { login } = require("../../controllers");

const loginRoutes = async (app, options) => {
  app.post("/", login.index);
};

module.exports = loginRoutes;
