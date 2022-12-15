const Fastify = require("fastify");

const port = 3000;
const host = "0.0.0.0";

// Run the server!
const start = async () => {
  const fastify = Fastify({
    logger: true,
    trustProxy: true,
    bodyLimit: 1048576 * 10,
  });
  // Declare a route
  fastify.get("/", async (request, reply) => {
    return reply.send({
      status: "ok",
    });
  });
  try {
    await fastify.listen({ port, host });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
