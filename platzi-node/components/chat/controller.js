const store = require("./store");

function getChats(userId) {
  return store.list(userId);
}

function addUsers(users) {
  if (!users || !Array.isArray(users)) return Promise.reject("Invalid user list");
  const chat = {
    users,
  };
  return store.add(chat);
}

module.exports = {
  getChats,
  addUsers,
};