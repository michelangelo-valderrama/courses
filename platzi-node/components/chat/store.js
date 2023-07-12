const Model = require("./model");

function getUsers(usersId) {
  return new Promise((res, rej) => {
    const users = Model.find(usersId ? { users: usersId } : {});
    users
      .populate("users")
      .then((data) => {
        console.log("[got users]");
        res(data);
      })
      .catch((error) => {
        rej(error);
      });
  });
}

function addUsers(chat) {
  const myUsers = new Model(chat);
  console.log("[added chat]");
  return myUsers.save();
}

module.exports = {
  list: getUsers,
  add: addUsers,
};
