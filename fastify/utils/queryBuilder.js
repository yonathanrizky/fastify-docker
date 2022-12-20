const insertData = async (table, data) => {
  let success = false,
    error = false,
    result = false;
  try {
    success = await knex(table).insert(data);
    result = {
      id: success[0],
    };
  } catch (err) {
    result = {
      error: {
        code: err.code,
        message: err.sqlMessage,
      },
    };
  }

  return result;
};

const updateData = async (table, data, where) => {
  let success = false,
    error = false;
  try {
    success = await knex(table).update(data).where(where);
    if (!success) {
      error = "Data Tidak Ditemukan";
    }
  } catch (err) {
    error = err;
  }

  return {
    success: success,
    error: error,
  };
};

const deleteData = async (table, where) => {
  let success = false,
    error = false;
  try {
    success = await knex(table).where(where).del();
    if (!success) {
      error = "Data Tidak Ditemukan";
    }
  } catch (err) {
    error = err;
  }

  return {
    success: success,
    error: error,
  };
};

module.exports = {
  insertData,
  updateData,
  deleteData,
};
