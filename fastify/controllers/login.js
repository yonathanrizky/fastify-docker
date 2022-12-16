const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const index = async (request, reply) => {
  const body = request.body;
  const name = body.name;
  const email = body.email;
  let password = body.password;

  let user = await knex("users").where({
    email,
  });
  user = user[0];
  let userPassword = user.password;

  const isValidPassword = await bcrypt.compare(password, userPassword);

  const data = {
    name,
    email,
  };

  const token = jwt.sign(data, JWT_SECRET, {
    expiresIn: 86400,
  });

  return reply.send({
    name,
    email,
    key_token: "Bearer",
    token,
  });
};

module.exports = {
  index,
};
