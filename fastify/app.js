const Fastify = require("fastify");
require("dotenv").config();
global.knex = require("./knex/knex.js");

const build = async () => {
  const fastify = Fastify({
    logger: true,
    trustProxy: true,
    bodyLimit: 1048576 * 10,
  });

  /** handle data from body */
  await fastify.register(require("@fastify/formbody"));
  await fastify.register(require("@fastify/multipart"), {
    attachFieldsToBody: "keyValues",
  });

  await fastify.register(require("@fastify/cors"), { origin: "*" });
  await fastify.register(require("@fastify/helmet"), {
    contentSecurityPolicy: {
      directives: {
        baseUri: ["'self'"],
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'self'"],
        workerSrc: ["'self'", "blob:"],
        frameSrc: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
  });

  /** jwt auth */
  await fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET,
  });

  await fastify.register(require("./middleware/auth"));

  /** route */
  await fastify.register(require("./routes/api"), { prefix: "api" });

  fastify.setNotFoundHandler((request, reply) => {
    fastify.log.debug(`Route not found: ${request.method}:${request.raw.url}`);

    reply.status(404).send({
      statusCode: 404,
      error: NOT_FOUND,
      message: `Route ${request.method}:${request.raw.url} not found`,
    });
  });

  fastify.setErrorHandler((err, request, reply) => {
    fastify.log.debug(`Request url: ${request.raw.url}`);
    fastify.log.debug(`Payload: ${request.body}`);
    fastify.log.error(`Error occurred: ${err}`);

    const code = err.statusCode ?? 500;

    reply.status(code).send({
      statusCode: code,
      error: err.name ?? INTERNAL_SERVER_ERROR,
      message: err.message ?? err,
    });
  });

  return fastify;
};

// implement inversion of control to make the code testable
module.exports = {
  build,
};
