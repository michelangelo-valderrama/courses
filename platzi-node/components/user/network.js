const express = require("express");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./controller");

router.get("/", (req, res) => {
  controller
    .getUsers()
    .then((data) => {
      response.success(req, res, data);
    })
    .catch((error) => {
      response.error(req, res, "Internal Error", 500, error);
    });
});

router.post("/", (req, res) => {
  controller
    .addUser(req.body.user)
    .then((data) => {
      response.success(req, res, data);
    })
    .catch((error) => {
      response.error(req, res, "Internal Error", 500, error);
    });
});

module.exports = router;
