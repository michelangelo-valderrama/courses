const moongose = require("mongoose");

const Schema = moongose.Schema;

const mySchema = new Schema({
  users: {
    type: [Schema.ObjectId],
    ref: "User"
  }
});

const model = moongose.model("Chat", mySchema);

module.exports = model;
