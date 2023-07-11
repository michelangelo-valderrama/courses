"use strict";

const { error } = require("../../network/response");
const Model = require("./model");

function addMessage(message) {
  const myMessage = new Model(message);
  console.log("[added message]");
  myMessage.save();
}

function getMessage(filterUser) {
  return new Promise((res, rej) => {
    const messages = Model.find(filterUser ? { user: filterUser } : {});
    messages
      .populate("user")
      .then((data) => {
        res(data);
      })
      .catch((error) => {
        rej(error);
      });
  });
}

async function updateText(id, message) {
  const updatedMessage = await Model.findOneAndUpdate(
    { _id: id },
    { message },
    { new: true }
  );
  console.log("[found message]");
  return updatedMessage;
}

async function removeMessage(id) {
  console.log("deleted message");
  return Model.deleteOne({
    _id: id,
  });
}

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText,
  removeMessage,
};
