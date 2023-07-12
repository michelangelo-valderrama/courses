const express = require("express");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./controller");

router.get("/:id", (req, res) => {
  controller
    .getChats(req.params.id)
    .then((data) => {
      response.success(req, res, data);
    })
    .catch((error) => {
      response.error(req, res, "Internal Error", 500, error);
    });
});

router.post("/", (req, res) => {
  controller
    .addUsers(req.body.usersId)
    .then((data) => {
      response.success(req, res, data);
    })
    .catch((error) => {
      response.error(req, res, "Internal Error", 500, error);
    });
});

module.exports = router;
