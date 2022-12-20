const responCode = (code, message, data) => {
  let result;
  if (code < 300) {
    result = {
      code,
      message,
      data,
    };
  } else {
    result = {
      error: true,
      code,
      data,
    };
  }
  return result;
};

module.exports = responCode;
