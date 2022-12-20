const apiRoutes = async (app, options) => {
  app.register(require("./login"), { prefix: "v1/login" });
  app.register(
    function (api, opts, done) {
      api.addHook("preHandler", async (req, res) => {
        //do something on api routes preHandler like middleware
        if (req.headers.authorization == undefined) {
          return res.code(401).send({
            message: "token not defined",
          });
        }

        try {
          await req.jwtVerify();
        } catch (err) {
          res.send(err);
        }
      });

      api.register(require("./example"), { prefix: "example" });
      app.register(require("./person"), { prefix: "person" });
      app.register(require("./user"), { prefix: "users" });
      done();
    },
    {
      prefix: "v1",
    }
  );
};

module.exports = apiRoutes;
