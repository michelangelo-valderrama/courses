"use strict";

const store = require("./store");
const { socket } = require("../../socket");
const config = require("../../config");

function addMessage(chat, user, message, file) {
  return new Promise((res, rej) => {
    if (!chat || !user || !message) {
      console.error("[messageController] No hay usuario o mensaje");
      return rej("Los datos son incorrectos");
    }

    let fileUrl = "";
    if (file) {
      fileUrl =
        `${config.host}:${config.port}${config.publicRoute}/${config.filesRoute}/` +
        file.filename;
    }
    // "http://localhost:3000/files/"

    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl,
    };

    store.add(fullMessage);
    socket.io.emit("message", fullMessage);
    res(fullMessage);
  });
}

function getMessage(filterUser) {
  return store.list(filterUser);
}

function updateMessage(id, message) {
  return new Promise(async (res, rej) => {
    if (!id || !message) return rej("Invalid Data");
    const result = await store.updateText(id, message);
    res(result);
  });
}

function deleteMessage(id) {
  return new Promise(async (res, rej) => {
    if (!id) return rej("Invalid Id");
    store
      .removeMessage(id)
      .then(() => {
        res();
      })
      .catch((error) => {
        rej(error);
      });
  });
}

module.exports = { addMessage, getMessage, updateMessage, deleteMessage };
