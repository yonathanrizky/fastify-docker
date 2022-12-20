const bcrypt = require("bcrypt");
const { responseFormatter } = require("../utils");
const { insertData } = require("../utils/queryBuilder");
const Ajv = require("ajv");
const ajv = new Ajv();

const create = async (request, reply) => {
  const validate = await validateRequest(request, reply);

  if (validate.message) {
    return reply.code(400).send(responseFormatter(400, null, validate));
  }

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

  const insert = await insertData("users", data);
  if (insert.error) {
    return reply.code(400).send(responseFormatter(400, null, insert));
  }
  return reply.code(200).send(responseFormatter(200, "Success", insert));
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
      name: { type: "string", minLength: 3 },
      email: { type: "string" },
      password: { type: "string", minLength: 5 },
    },
    required: ["name", "email", "password"],
  };

  const validate = ajv.compile(schema);

  const valid = validate({
    name: body.name,
    email: body.email,
    password: body.password,
  });

  if (!valid) {
    return {
      message: validate.errors[0].message,
    };
  }

  return { error: false };
};

module.exports = {
  create,
};
