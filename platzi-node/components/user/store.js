const Model = require("./model");

function getUsers() {
  console.log("[got users]");
  return Model.find();
}

function addUser(user) {
  const myUser = new Model(user);
  console.log("[added user]");
  return myUser.save();
}

module.exports = {
  add: addUser,
  list: getUsers,
};
