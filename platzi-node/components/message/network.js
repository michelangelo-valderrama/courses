"user strict";

const express = require("express");
const multer = require("multer");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./controller");
const config = require("../../config");
const upload = multer({
  dest: `public/${config.filesRoute}/`,
});

router.get("/", (req, res) => {
  const filterMessages = {
    chat: req.query.chat || null,
    user: req.query.user || null,
  };
  controller
    .getMessage(filterMessages)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((error) => {
      response.error(req, res, "Unexpected Error", 500, error);
    });
});

router.post("/", upload.single("file"), (req, res) => {
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((error) => {
      console.log(error);
      response.error(
        req,
        res,
        "Información Inválida",
        400,
        "Error en el controlador"
      );
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data);
    })
    .catch((error) => {
      response.error(req, res, "Internal error", 500, error);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Deleted message: ${req.params.id}`, 200);
    })
    .catch((error) => {
      response.error(req, res, "Internal error", 500, error);
    });
});

module.exports = router;
