"user strict";

exports.success = (req, res, message, status = 200) => {
  res.status(status).send({
    error: "",
    body: message,
  });
};

exports.error = (req, res, message, status = 500, details) => {
  console.error(`[response error]: ${details}`);

  res.status(status).send({
    error: message,
    body: "",
  });
};
