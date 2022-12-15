const { build } = require("./app");
const { terminate } = require("./utils");
const port = 3000;
const host = "0.0.0.0";
build()
  .then((app) => {
    app
      .listen({ port, host })
      .then((_) => {
        const exitHandler = terminate(app, {
          coredump: false,
          timeout: 500,
        });

        process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
        process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));
        process.on("SIGTERM", exitHandler(0, "SIGTERM"));
        process.on("SIGINT", exitHandler(0, "SIGINT"));
      })
      .catch((err) => {
        console.log("Error starting server: ", err);
        process.exit(1);
      });
  })
  .catch((err) => console.log(err));
