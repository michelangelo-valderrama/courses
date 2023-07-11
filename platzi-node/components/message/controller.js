"use strict";

const store = require("./store");
function addMessage(user, message) {
  return new Promise((res, rej) => {
    if (!user || !message) {
      console.error("[messageController] No hay usuario o mensaje");
      return rej("Los datos son incorrectos");
    }

    const fullMessage = {
      user: user,
      message: message,
      date: new Date(),
    };

    store.add(fullMessage);
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
