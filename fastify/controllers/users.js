const bcrypt = require("bcrypt");
const create = async (request, reply) => {
  const body = request.body;
  const name = body.name;
  const email = body.email;
  let password = body.password;
  password = await bcrypt.hash(password, 10);

  const data = {
    name,
    email,
    password,
  };
  const insert = await knex("users").insert(data);

  return reply.send(data);
};

module.exports = {
  create,
};
