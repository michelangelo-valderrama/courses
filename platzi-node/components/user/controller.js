const store = require("./store");

function addUser(name) {
  if (!name) return Promise.reject("Invalid Name");
  const user = { name };
  return store.add(user);
}

function getUsers() {
  return store.list();
}

module.exports = {
  addUser,
  getUsers,
};
