const index = async (request, reply) => {
  let data = await knex("person");
  return reply.send(data);
};

const detail = async (request, reply) => {
  const id = request.params.id;
  let data = await knex("person").where("id", id);
  return reply.send(data);
};

const create = async (request, reply) => {
  const name = request.body.name;
  const age = request.body.age;
  let res = await knex("person").insert({
    name: name,
    age: age,
  });
  return reply.send(res[0]);
};

const update = async (request, reply) => {
  const id = request.params.id;
  const name = request.body.name;
  const age = request.body.age;
  let res = await knex("person")
    .update({
      name: name,
      age: age,
    })
    .where({ id: id });
  return reply.send(id);
};

const destroy = async (request, reply) => {
  const id = request.params.id;
  let success = await knex("person").where({ id: id }).del();
  return reply.send(id);
};

module.exports = {
  index,
  detail,
  create,
  update,
  destroy,
};
