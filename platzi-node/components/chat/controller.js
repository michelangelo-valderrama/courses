const store = require("./store");

function getChats() {
  return store.list();
}

function addUsers(usersId) {
  const chat = {
    users: usersId,
  };
  console.log(chat);
  return store.add(chat);
}

module.exports = {
  getChats,
  addUsers,
};
