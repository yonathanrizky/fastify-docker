const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const Ajv = require("ajv");
const { responseFormatter } = require("../utils");
const ajv = new Ajv();

const index = async (request, reply) => {
  const validate = await validateRequest(request, reply);

  if (validate.message) {
    return reply.code(400).send(responseFormatter(400, null, validate));
  }

  const body = request.body;
  const email = body.email;
  let password = body.password;

  let user = await knex("users").where({
    email,
  });
  user = user[0];
  if (user === undefined) {
    return reply
      .code(404)
      .send(responseFormatter(404, null, { message: "User not found" }));
  }

  let userPassword = user.password;
  const name = user.name;

  const isValidPassword = await bcrypt.compare(password, userPassword);
  if (!isValidPassword) {
    return reply.code(401).send(
      responseFormatter(401, null, {
        message: "Password Wrong, Please try again",
      })
    );
  }

  const data = {
    name,
    email,
  };

  const token = jwt.sign(data, JWT_SECRET, {
    expiresIn: 86400,
  });

  return reply.send(
    responseFormatter(200, "Success", {
      name,
      email,
      key_token: "Bearer",
      token,
    })
  );
};

const validateRequest = async (req, res) => {
  const body = req.body;
  if (!body) {
    return {
      message: "No request sent",
    };
  }

  let schema = {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string", minLength: 5 },
    },
    required: ["email", "password"],
  };

  const validate = ajv.compile(schema);

  const valid = validate({
    email: req.body.email,
    password: req.body.password,
  });

  if (!valid) {
    return {
      message: validate.errors[0].message,
    };
  }

  return { error: false };
};

module.exports = {
  index,
};
