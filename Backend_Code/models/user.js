// let value = 1200;
const mongoose = require("mongoose");
Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  userName : {type:String},
  userid: {type: String, unique: true},
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});
const userModel  = mongoose.model("Users", userSchema);
module.exports = userModel;
